import { supabase } from "@/integrations/supabase/client";

/** Display name builder with fallbacks.
 * Order: [first_name, last_name] -> legacy name -> email prefix -> "Anonymous"
 */
export const buildDisplayName = (input: any): string => {
  if (!input) return "Anonymous";
  const fn = input.first_name ?? input.firstName ?? undefined;
  const ln = input.last_name ?? input.lastName ?? undefined;
  const fromSplit = fn || ln ? [fn, ln].filter(Boolean).join(" ") : undefined;
  const legacy = input.name ?? input.full_name ?? undefined;
  const email = input.email ?? input.user?.email ?? undefined;
  const emailPrefix = typeof email === "string" ? email.split("@")[0] : undefined;
  return fromSplit || legacy || emailPrefix || "Anonymous";
};

/**
 * Safely fetch a user profile, handling cases where the profile might not exist
 * Use this instead of .single() when you're not certain the profile exists
 */
export const safeGetProfile = async <T = any>(
  userId: string,
  selectFields: string = "*",
): Promise<{ data: T | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(selectFields)
      .eq("id", userId)
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { data: null, error };
  }
};

/**
 * Safely fetch a user profile with error handling and logging
 * Throws an error only if specified, otherwise returns null on failure
 */
export const getUserProfile = async <T = any>(
  userId: string,
  selectFields: string = "*",
  throwOnError: boolean = false,
): Promise<T | null> => {
  const { data, error } = await safeGetProfile<T>(userId, selectFields);

  if (error) {
    const errorMessage = `Failed to fetch profile for user ${userId}: ${error.message}`;

    if (throwOnError) {
      throw new Error(errorMessage);
    }

    console.warn(errorMessage);
    return null;
  }

  return data;
};

/**
 * Check if a user profile exists
 */
export const profileExists = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    return !error && data !== null;
  } catch (error) {
    console.error(
      `Error checking if profile exists for user ${userId}:`,
      error,
    );
    return false;
  }
};
