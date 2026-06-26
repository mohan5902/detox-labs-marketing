import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Dynamically resolves the Supabase client at runtime using active environment variables.
 * Throws a descriptive error if environment variables are missing.
 */
function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Supabase URL is missing. Please configure the NEXT_PUBLIC_SUPABASE_URL environment variable."
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "Supabase Key is missing. Please configure either the SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable."
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

/**
 * Transparent proxy that delegates all calls to the dynamically resolved Supabase client.
 * This prevents Next.js from capturing compile-time fallbacks during static bundle analysis.
 */
export const supabase = new Proxy({} as any, {
  get(target, prop, receiver) {
    const client = getSupabaseClient();
    return Reflect.get(client, prop, receiver);
  },
}) as SupabaseClient;
