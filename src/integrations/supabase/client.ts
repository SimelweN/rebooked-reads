import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const isDev = (() => {
  try {
    return (import.meta as any).env?.DEV ?? false;
  } catch {
    return false;
  }
})();

// Hardcoded Supabase configuration for this project
const SUPABASE_URL = "https://tefjsvwybbfecdilmvor.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZmpzdnd5YmJmZWNkaWxtdm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDY3OTcsImV4cCI6MjA3NjQ4Mjc5N30.kPx3yqB5AuMnZ1JPxtQ4OO8bmkR1EFsFkD7EQW9RL7o";

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
