import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";
import {
  EmailRequest,
  EmailResponse,
  EMAIL_ERRORS,
} from "../_shared/email-types.ts";
import { parseRequestBody } from "../_shared/safe-body-parser.ts";
import {
  validateEmailRequest,
  sanitizeEmailContent,
  formatEmailAddresses,
  logEmailEvent,
  createRateLimitKey,
} from "../_shared/email-utils.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

// In-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10, // Max emails per window
  windowMs: 60 * 1000, // 1 minute window
};

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

async function processEmailRequest(request: EmailRequest) {
  // Validate the request
  const validation = validateEmailRequest(request);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  let html = request.html;
  let text = request.text;

  // Template system deprecated
  if (request.template) {
    console.log(`⚠️ Template system deprecated. Use direct html/text instead.`);
    throw new Error(
      "Template system is deprecated. Please provide html and text directly.",
    );
  }

  // Sanitize content
  if (html) {
    html = sanitizeEmailContent(html);
  }

  const defaultFrom = Deno.env.get("DEFAULT_FROM_EMAIL") || 
    "ReBooked Solutions <noreply@rebookedsolutions.co.za>";

  return {
    from: request.from || defaultFrom,
    to: Array.isArray(request.to) ? request.to : [request.to],
    subject: request.subject,
    html,
    text,
    reply_to: request.replyTo,
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "METHOD_NOT_ALLOWED",
        details: {
          provided_method: req.method,
          required_method: "POST",
          message: "Email endpoint only accepts POST requests",
        },
        fix_instructions: "Send email requests using POST method only",
      }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Parse request body
    const bodyResult = await parseRequestBody<EmailRequest>(req, corsHeaders);
    if (!bodyResult.success) {
      return bodyResult.errorResponse!;
    }
    const emailRequest = bodyResult.data;

    // Handle test requests
    if (emailRequest.test === true) {
      const hasApiKey = !!Deno.env.get("RESEND_API_KEY");
      return new Response(
        JSON.stringify({
          success: true,
          message: hasApiKey ? "Resend API configured" : "Resend API key missing",
          config: {
            hasApiKey,
            provider: "Resend",
          },
        }),
        {
          status: hasApiKey ? 200 : 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Check for API key
    if (!Deno.env.get("RESEND_API_KEY")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "ENVIRONMENT_CONFIG_ERROR",
          details: {
            message: "RESEND_API_KEY environment variable is required",
          },
          fix_instructions: "Configure RESEND_API_KEY environment variable",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = createRateLimitKey(
      clientIP,
      Array.isArray(emailRequest.to) ? emailRequest.to[0] : emailRequest.to,
    );
    const rateCheck = checkRateLimit(rateLimitKey);

    if (!rateCheck.allowed) {
      logEmailEvent("rate_limited", {
        ip: clientIP,
        to: emailRequest.to,
        resetTime: rateCheck.resetTime,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: "RATE_LIMIT_EXCEEDED",
          details: {
            reset_time: rateCheck.resetTime,
            max_requests: RATE_LIMIT.maxRequests,
            window_ms: RATE_LIMIT.windowMs,
            client_ip: clientIP,
            message: "Too many email requests from this client",
          },
          fix_instructions: `Wait ${Math.ceil((rateCheck.resetTime! - Date.now()) / 1000)} seconds before sending another email`,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(
              Math.ceil((rateCheck.resetTime! - Date.now()) / 1000),
            ),
          },
        },
      );
    }

    // Process the email request
    const mailOptions = await processEmailRequest(emailRequest);

    // Send the email using Resend
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      throw new Error(error.message || "Failed to send email");
    }

    // Log successful send
    logEmailEvent("sent", {
      messageId: data?.id,
      to: emailRequest.to,
      subject: emailRequest.subject,
    });

    const response: EmailResponse = {
      success: true,
      messageId: data?.id,
      details: {
        email_provider: "Resend",
        sent_at: new Date().toISOString(),
      },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log the error
    logEmailEvent("failed", {
      error: error.message,
      stack: error.stack,
    });

    // Determine error details and status code
    let errorCode = "EMAIL_SEND_FAILED";
    let statusCode = 500;
    let fixInstructions = "Check email configuration and try again";

    if (
      error.message.includes("MISSING_REQUIRED_FIELDS") ||
      error.message.includes("INVALID_EMAIL_FORMAT") ||
      error.message.includes("TEMPLATE_NOT_FOUND")
    ) {
      errorCode = "VALIDATION_FAILED";
      statusCode = 400;
      fixInstructions = "Check email request format and required fields";
    } else if (error.message.includes("RESEND_API_KEY")) {
      errorCode = "ENVIRONMENT_CONFIG_ERROR";
      statusCode = 500;
      fixInstructions = "Configure RESEND_API_KEY environment variable";
    }

    const response: EmailResponse = {
      success: false,
      error: errorCode,
      details: {
        error_message: error.message,
        error_type: error.constructor.name,
        timestamp: new Date().toISOString(),
      },
      fix_instructions: fixInstructions,
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
