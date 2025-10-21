import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl =
      Deno.env.get("VITE_SUPABASE_URL") ||
      Deno.env.get("SUPABASE_URL") ||
      "https://tefjsvwybbfecdilmvor.supabase.co";

    const supabaseAnonKey =
      Deno.env.get("VITE_SUPABASE_ANON_KEY") ||
      Deno.env.get("SUPABASE_ANON_KEY") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZmpzdnd5YmJmZWNkaWxtdm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDY3OTcsImV4cCI6MjA3NjQ4Mjc5N30.kPx3yqB5AuMnZ1JPxtQ4OO8bmkR1EFsFkD7EQW9RL7o";

    const body = {
      supabaseUrl,
      supabaseAnonKey,
    };

    return new Response(JSON.stringify(body), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load public config", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});