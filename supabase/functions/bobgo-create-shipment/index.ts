import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { parseRequestBody } from "../_shared/safe-body-parser.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface CreateShipmentRequest {
  order_id: string;
  provider_slug: string;
  service_level_code: string;
  pickup_address: any;
  delivery_address: any;
  parcels: any[];
  reference?: string;
  special_instructions?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const bodyResult = await parseRequestBody<CreateShipmentRequest>(req, corsHeaders);
    if (!bodyResult.success) return bodyResult.errorResponse!;

    const {
      order_id,
      provider_slug,
      service_level_code,
      pickup_address,
      delivery_address,
      parcels,
      reference,
      special_instructions,
    } = bodyResult.data!;

    if (!order_id || !pickup_address || !delivery_address || !parcels || parcels.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields: order_id, pickup_address, delivery_address, parcels" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!provider_slug || !service_level_code) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing provider_slug and service_level_code - must call bobgo-get-rates first to get available rates" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
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

    let shipmentResult: any = null;
    let simulated = false;

    if (!BOBGO_API_KEY) {
      console.warn("No BOBGO_API_KEY - simulating shipment creation");
      simulated = true;
      const mockTracking = `BOG${Date.now().toString().slice(-9)}`;
      shipmentResult = {
        tracking_number: mockTracking,
        shipment_id: `bobgo_ship_${Date.now()}`,
        waybill_url: `https://example.com/labels/${mockTracking}.pdf`,
        estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        carrier: "simulated",
        cost: 0,
        simulated: true,
      };
    } else {
      try {
        const payload = {
          collection_address: {
            company: pickup_address.company || "Seller",
            street_address: pickup_address.streetAddress || pickup_address.street_address || "",
            local_area: pickup_address.suburb || pickup_address.local_area,
            city: pickup_address.city || pickup_address.suburb,
            zone: pickup_address.province || pickup_address.zone,
            country: "ZA",
            code: pickup_address.postalCode || pickup_address.postal_code || pickup_address.code,
          },
          collection_contact_name: pickup_address.contact_name || "Seller",
          collection_contact_mobile_number: pickup_address.contact_phone || "0000000000",
          collection_contact_email: pickup_address.contact_email || "seller@example.com",
          delivery_address: {
            company: delivery_address.company || "",
            street_address: delivery_address.streetAddress || delivery_address.street_address || "",
            local_area: delivery_address.suburb || delivery_address.local_area,
            city: delivery_address.city || delivery_address.suburb,
            zone: delivery_address.province || delivery_address.zone,
            country: "ZA",
            code: delivery_address.postalCode || delivery_address.postal_code || delivery_address.code,
          },
          delivery_contact_name: delivery_address.contact_name || "Buyer",
          delivery_contact_mobile_number: delivery_address.contact_phone || "0000000000",
          delivery_contact_email: delivery_address.contact_email || "buyer@example.com",
          parcels: parcels.map((p: any) => ({
            description: p.description || "Book",
            submitted_length_cm: p.length || 10,
            submitted_width_cm: p.width || 10,
            submitted_height_cm: p.height || 10,
            submitted_weight_kg: p.weight || 1,
            custom_parcel_reference: p.reference || "",
          })),
          declared_value: parcels.reduce((sum: number, p: any) => sum + (p.value || 100), 0),
          custom_tracking_reference: reference || `ORDER-${order_id}`,
          instructions_collection: special_instructions || "",
          instructions_delivery: special_instructions || "",
          service_level_code: service_level_code,
          provider_slug: provider_slug,
        };

        const resp = await fetch(`${BOBGO_BASE_URL}/shipments`, {
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
          console.error("Bobgo shipment HTTP error:", resp.status, text);
          throw new Error(`Bobgo shipment HTTP ${resp.status}: ${text}`);
        }

        const data = await resp.json();

        shipmentResult = {
          tracking_number: data.tracking_reference || data.tracking_number,
          shipment_id: data.id,
          submission_status: data.submission_status,
          status: data.status,
          estimated_collection_date: data.meta?.estimated_collection_date,
          estimated_delivery_date: data.meta?.estimated_delivery_date,
          carrier: data.provider_slug,
          service_level: data.service_level_code,
          cost: data.rate || data.charged_amount || 0,
          raw: data,
        };
      } catch (err: any) {
        console.error("Bobgo create shipment failed:", err?.message || err);
        simulated = true;
        const mockTracking = `BOG${Date.now().toString().slice(-9)}`;
        shipmentResult = {
          tracking_number: mockTracking,
          shipment_id: `bobgo_ship_${Date.now()}`,
          waybill_url: `https://example.com/labels/${mockTracking}.pdf`,
          estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          carrier: "simulated",
          api_error: err.message,
          simulated: true,
        };
      }
    }

    try {
      const updateObj: any = {
        tracking_number: shipmentResult.tracking_number,
        delivery_provider: "bobgo",
        delivery_data: { ...shipmentResult, updated_at: new Date().toISOString() },
        status: "shipped",
        delivery_status: "shipped",
        updated_at: new Date().toISOString(),
      };
      await supabase.from("orders").update(updateObj).eq("id", order_id);
    } catch (e) {
      console.error("DB update error:", e);
    }

    try {
      const { data: orderInfo } = await supabase
        .from("orders")
        .select("buyer_id, buyer_email")
        .eq("id", order_id)
        .single();
      if (orderInfo?.buyer_id && shipmentResult.tracking_number) {
        await supabase.from("notifications").insert({
          user_id: orderInfo.buyer_id,
          type: "info",
          title: "📦 Your Order Has Shipped!",
          message: `Your order has been shipped via ${shipmentResult.carrier}. Tracking: ${shipmentResult.tracking_number}`,
          order_id,
        });
      }
    } catch (notifyErr) {
      console.warn("Notification failed:", notifyErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        simulated,
        tracking_number: shipmentResult.tracking_number,
        shipment_id: shipmentResult.shipment_id,
        waybill_url: shipmentResult.waybill_url,
        estimated_delivery: shipmentResult.estimated_delivery,
        carrier: shipmentResult.carrier,
        cost: shipmentResult.cost,
        raw: shipmentResult.raw,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("bobgo-create-shipment error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to create shipment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
