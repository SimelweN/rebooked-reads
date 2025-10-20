import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { parseRequestBody } from "../_shared/safe-body-parser.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    let tracking_number: string | null = null;

    if (req.method === "GET") {
      const url = new URL(req.url);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length > 0) {
        tracking_number = decodeURIComponent(parts[parts.length - 1]);
      }
    }

    if (!tracking_number) {
      const bodyResult = await parseRequestBody<{ tracking_number?: string }>(req, corsHeaders);
      if (!bodyResult.success) return bodyResult.errorResponse!;
      tracking_number = bodyResult.data!.tracking_number || null;
    }

    if (!tracking_number) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing tracking_number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const BOBGO_API_KEY = Deno.env.get("BOBGO_API_KEY");

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

    let trackingInfo: any = null;
    let simulated = false;

    if (!BOBGO_API_KEY) {
      console.warn("No BOBGO_API_KEY - returning simulated tracking");
      simulated = true;
      trackingInfo = {
        tracking_number,
        status: "in_transit",
        current_location: "Cape Town Hub",
        estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        events: [
          { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: "collected", description: "Collected from sender", location: "Seller Hub" },
          { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: "in_transit", description: "In transit", location: "Regional Hub" },
        ],
        provider: "bobgo",
        simulated: true,
      };
    } else {
      try {
        const resp = await fetch(`${BOBGO_BASE_URL}/tracking?tracking_reference=${encodeURIComponent(tracking_number)}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BOBGO_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => "");
          console.error("Bobgo tracking HTTP error:", resp.status, text);
          throw new Error(`Bobgo tracking HTTP ${resp.status}: ${text}`);
        }

        const data = await resp.json();
        const events = (data.tracking_events || []).map((e: any) => ({
          id: e.id,
          parcel_id: e.parcel_id,
          timestamp: e.date,
          status: e.status,
          status_friendly: e.status_friendly || e.status,
          location: e.location || "",
          message: e.message || "",
          source: e.source || "",
        }));

        trackingInfo = {
          tracking_number: data.short_tracking_reference || tracking_number,
          full_tracking_reference: data.custom_tracking_reference,
          shipment_id: data.shipment_id,
          status: data.status,
          provider_id: data.provider_id,
          provider: "bobgo",
          created_at: data.shipment_time_created,
          updated_at: data.shipment_time_modified,
          events,
          raw: data,
        };
      } catch (err: any) {
        console.error("Bobgo track failed:", err?.message || err);
        simulated = true;
        trackingInfo = {
          tracking_number,
          status: "in_transit",
          current_location: "Regional Hub",
          estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          events: [],
          provider: "bobgo",
          simulated: true,
          api_error: err.message,
        };
      }
    }

    return new Response(
      JSON.stringify({ success: true, tracking: trackingInfo, simulated }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("bobgo-track-shipment error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to track shipment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
