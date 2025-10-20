import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { parseRequestBody } from "../_shared/safe-body-parser.ts";

interface Address {
  suburb: string;
  province: string; // pass short code (e.g., GP)
  postalCode: string;
  streetAddress?: string;
  city?: string;
}

interface RateRequest {
  fromAddress?: Address;
  toAddress?: Address;
  parcels?: Array<{
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    value?: number;
  }>;
  serviceType?: string;
  preferences?: { carriers?: string[]; service_levels?: string[] };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const bodyResult = await parseRequestBody<RateRequest>(req, corsHeaders);
    if (!bodyResult.success) return bodyResult.errorResponse!;

    const { fromAddress, toAddress, parcels, serviceType, preferences } = bodyResult.data!;

    const validationErrors = [] as string[];
    if (!fromAddress) validationErrors.push("fromAddress required");
    if (!toAddress) validationErrors.push("toAddress required");
    if (!parcels || !Array.isArray(parcels) || parcels.length === 0) {
      validationErrors.push("parcels required");
    }
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: "VALIDATION_FAILED", details: validationErrors }),
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

    if (!fromAddress || !toAddress || !parcels) throw new Error("Validation should have caught missing data");

    if (!BOBGO_API_KEY || BOBGO_API_KEY.trim() === "") {
      console.warn("BOBGO_API_KEY not set - returning simulated quotes");
      return new Response(
        JSON.stringify({
          success: true,
          quotes: parcels.map((p, i) => ({
            provider: "bobgo",
            carrier: "simulated",
            service_name: serviceType || "Standard",
            service_code: "STANDARD",
            cost: Math.round(Math.max(50, (p.weight || 1) * 40)),
            transit_days: 2,
            offer_id: `SIM_OFFER_${Date.now()}_${i}`,
            fallback: true,
          })),
          simulated: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: any = {
      collection_address: {
        street_address: fromAddress.streetAddress || "",
        company: "Seller",
        local_area: fromAddress.suburb,
        city: fromAddress.city || fromAddress.suburb,
        zone: fromAddress.province,
        country: "ZA",
        code: fromAddress.postalCode,
      },
      collection_contact_name: "Seller",
      collection_contact_mobile_number: "0000000000",
      collection_contact_email: "seller@example.com",
      delivery_address: {
        street_address: toAddress.streetAddress || "",
        company: "",
        local_area: toAddress.suburb,
        city: toAddress.city || toAddress.suburb,
        zone: toAddress.province,
        country: "ZA",
        code: toAddress.postalCode,
      },
      delivery_contact_name: "Buyer",
      delivery_contact_mobile_number: "0000000000",
      delivery_contact_email: "buyer@example.com",
      parcels: parcels.map((p) => ({
        description: "Book",
        submitted_length_cm: p.length || 10,
        submitted_width_cm: p.width || 10,
        submitted_height_cm: p.height || 10,
        submitted_weight_kg: p.weight || 1,
        custom_parcel_reference: "",
      })),
      declared_value: parcels.reduce((sum, p) => sum + (p.value || 100), 0),
      timeout: 10000,
    };

    if (preferences?.carriers?.length) payload.providers = preferences.carriers;
    if (preferences?.service_levels?.length) payload.service_levels = preferences.service_levels;

    try {
      const resp = await fetch(`${BOBGO_BASE_URL}/rates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BOBGO_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        console.error("Bobgo rates HTTP error:", resp.status, text);
        throw new Error(`Bobgo rates HTTP ${resp.status}: ${text}`);
      }

      const data = await resp.json();
      const rates = data.rates || [];

      const quotes = rates.map((r: any) => ({
        provider: "bobgo",
        provider_slug: r.provider_slug,
        service_level_code: r.service_level_code,
        carrier: r.provider_name || r.courier_name || "Unknown",
        service_name: r.service_level_name || r.service_name || "Unknown Service",
        cost: r.total_charge || r.charge || 0,
        currency: r.currency || "ZAR",
        transit_days: r.delivery_days || 3,
        collection_date: r.collection_date,
        delivery_date: r.delivery_date,
        rate_id: r.id,
        meta: r,
      }));

      return new Response(
        JSON.stringify({ success: true, quotes, provider: "bobgo", raw: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      console.error("Bobgo rates failed:", err?.message || err);
      return new Response(
        JSON.stringify({ success: true, quotes: [{ provider: "bobgo", carrier: "simulated", service_name: "Standard (Estimated)", service_code: "STANDARD", cost: 95, transit_days: 3, offer_id: `SIM_OFFER_${Date.now()}`, fallback: true, api_error: err.message }], simulated: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error: any) {
    console.error("bobgo-get-rates error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to get rates" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
