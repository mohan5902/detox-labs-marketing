import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Dynamically resolves the Supabase client at runtime using active environment variables.
 * In Next.js, Webpack statically replaces "process.env.NEXT_PUBLIC_*" references with their
 * build-time values (which are undefined in Vercel's build stage).
 *
 * To resolve this at runtime on Vercel:
 * 1. We prioritize non-public server variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
 * 2. We use bracket notation process.env["NEXT_PUBLIC_*"] which Webpack does NOT statically replace,
 *    allowing it to be read dynamically at runtime from Vercel's live environment.
 */
function getSupabaseClient(): SupabaseClient {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env["NEXT_PUBLIC_SUPABASE_URL"];

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  if (!supabaseUrl) {
    throw new Error(
      `Supabase URL is missing. Please configure either the SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable. Available env keys: ${Object.keys(
        process.env
      ).join(", ")}`
    );
  }

  if (!supabaseKey) {
    throw new Error(
      `Supabase Key is missing. Please configure either SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.`
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
 */
export const supabase = new Proxy({} as any, {
  get(target, prop, receiver) {
    const client = getSupabaseClient();
    return Reflect.get(client, prop, receiver);
  },
}) as SupabaseClient;
