import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Minimal CORS headers for browser calls
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Temporary stub to avoid build failures while email provider is configured
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const message = {
    success: true,
    status: "email_service_stub",
    info: "Email function is currently disabled in preview. Configure RESEND_API_KEY and restore provider implementation to enable sending.",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(message), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
