import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { parseRequestBody } from "../_shared/safe-body-parser.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bodyResult = await parseRequestBody<{
      order_id?: string;
      shipment_id?: string;
      tracking_number?: string;
      reason?: string;
    }>(req, corsHeaders);
    if (!bodyResult.success) return bodyResult.errorResponse!;

    const { order_id, shipment_id, tracking_number, reason } = bodyResult.data!;

    console.log("Cancel request:", { order_id, shipment_id, tracking_number, reason });

    if (!order_id && !shipment_id && !tracking_number) {
      return new Response(
        JSON.stringify({ success: false, error: "order_id, shipment_id, or tracking_number required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get order from database
    let orderQuery = supabase
      .from("orders")
      .select("id, tracking_number, delivery_data, status");

    if (order_id) {
      orderQuery = orderQuery.eq("id", order_id);
    } else if (tracking_number) {
      orderQuery = orderQuery.eq("tracking_number", tracking_number);
    } else if (shipment_id) {
      orderQuery = orderQuery.eq("delivery_data->>shipment_id", shipment_id.toString());
    }

    const { data: order, error: orderError } = await orderQuery.maybeSingle();

    if (orderError) {
      console.error("Error fetching order:", orderError);
      return new Response(
        JSON.stringify({ success: false, error: `Database error: ${orderError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!order) {
      return new Response(
        JSON.stringify({ success: false, error: "Order not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Found order:", { id: order.id, tracking_number: order.tracking_number, status: order.status });

    // Use tracking_number as the identifier (BobGo uses this, not shipment_id)
    const identifier = order.tracking_number;

    if (!identifier) {
      return new Response(
        JSON.stringify({ success: false, error: "Order has no tracking number - cannot cancel shipment" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const BOBGO_API_KEY = Deno.env.get("BOBGO_API_KEY");

    if (!BOBGO_API_KEY) {
      console.warn("No BOBGO_API_KEY - simulating cancellation");
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "cancelled",
          cancellation_reason: reason || "Cancelled (simulated - no API key)",
          cancelled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) {
        console.error("Error updating order:", updateError);
        return new Response(
          JSON.stringify({ success: false, error: `Failed to update order: ${updateError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          simulated: true,
          message: "Order cancelled in database (API key not configured - shipment not cancelled with courier)",
          order_id: order.id,
          tracking_number: identifier
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    function resolveBaseUrl() {
      const env = (Deno.env.get("BOBGO_BASE_URL") || "").trim().replace(/\/+$/, "");
      if (!env) return "https://api.bobgo.co.za/v2";
      if (env.includes("sandbox.bobgo.co.za") && !env.includes("api.sandbox.bobgo.co.za")) {
        return "https://api.sandbox.bobgo.co.za/v2";
      }
      if (env.includes("bobgo.co.za") && !/\/v2$/.test(env)) {
        return env + "/v2";
      }
      return env;
    }

    const BOBGO_BASE_URL = resolveBaseUrl();
    console.log("Cancelling with BobGo:", { url: BOBGO_BASE_URL, tracking_number: identifier });

    try {
      const resp = await fetch(`${BOBGO_BASE_URL}/shipments/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BOBGO_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tracking_reference: identifier,
          cancellation_reason: reason || "Cancelled by merchant",
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        console.error("BobGo cancel HTTP error:", resp.status, text);

        // Still update the order in database even if API call fails
        await supabase
          .from("orders")
          .update({
            status: "cancelled",
            cancellation_reason: reason || `API error: ${text}`,
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        return new Response(
          JSON.stringify({
            success: false,
            error: `BobGo API error: ${text}`,
            message: "Order marked as cancelled in database, but BobGo API call failed",
            order_updated: true
          }),
          { status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data = await resp.json();
      console.log("BobGo cancellation response:", data);

      // Update order in database
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "cancelled",
          cancellation_reason: reason || "Cancelled via API",
          cancelled_at: new Date().toISOString(),
          delivery_data: {
            ...order.delivery_data,
            cancellation_response: data
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) {
        console.error("Error updating order:", updateError);
        return new Response(
          JSON.stringify({
            success: true,
            warning: "Shipment cancelled with BobGo but database update failed",
            bobgo_response: data,
            db_error: updateError.message
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Shipment cancelled successfully",
          order_id: order.id,
          tracking_number: identifier,
          bobgo_response: data
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      console.error("bobgo-cancel-shipment error:", err);

      // Mark as cancelled in DB even if API fails
      await supabase
        .from("orders")
        .update({
          status: "cancelled",
          cancellation_reason: reason || `Error: ${err.message}`,
          cancelled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      return new Response(
        JSON.stringify({
          success: false,
          error: err.message || "Cancel failed",
          message: "Order marked as cancelled in database, but API call failed",
          order_updated: true
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error: any) {
    console.error("bobgo-cancel-shipment fatal error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
