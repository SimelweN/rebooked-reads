import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { ENV } from "@/config/environment";

const isDev = (() => {
  try {
    return (import.meta as any).env?.DEV ?? false;
  } catch {
    return false;
  }
})();

const validateSupabaseConfig = () => {
  if (!ENV.VITE_SUPABASE_URL || ENV.VITE_SUPABASE_URL.trim() === "") {
    throw new Error("VITE_SUPABASE_URL is required. Please set this environment variable.");
  }
  if (!ENV.VITE_SUPABASE_ANON_KEY || ENV.VITE_SUPABASE_ANON_KEY.trim() === "") {
    throw new Error("VITE_SUPABASE_ANON_KEY is required. Please set this environment variable.");
  }
  try {
    new URL(ENV.VITE_SUPABASE_URL);
  } catch {
    throw new Error(`Invalid VITE_SUPABASE_URL: "${ENV.VITE_SUPABASE_URL}". Must be a valid URL.`);
  }
  const cleanKey = ENV.VITE_SUPABASE_ANON_KEY.replace(/\s+/g, "");
  if (cleanKey !== ENV.VITE_SUPABASE_ANON_KEY) {
    console.warn("Supabase API key contained whitespace/newlines — cleaning it");
  }
  return cleanKey;
};

const cleanApiKey = validateSupabaseConfig();

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient<Database>(ENV.VITE_SUPABASE_URL, cleanApiKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
      debug: isDev,
    },
    realtime: {
      params: { eventsPerSecond: 10 },
      heartbeatIntervalMs: 30000,
      reconnectAfterMs: (retries: number) => {
        if (retries >= 5) return false;
        return Math.min(1000 * Math.pow(2, retries), 10000);
      },
      timeout: 20000,
      logger: isDev
        ? ((level: string, message: string, ...args: any[]) => {
            if (level === "error" || level === "warn") console.log(`[Supabase Realtime ${level.toUpperCase()}]`, message, ...args);
          })
        : undefined,
    },
    global: { headers: { "X-Client-Info": "rebooked-marketplace" } },
  });

  return supabaseInstance;
};

export const supabase = getSupabase();
