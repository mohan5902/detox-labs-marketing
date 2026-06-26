import { createClient } from "@supabase/supabase-js";

// Next.js evaluates API routes during "next build" (static analysis).
// We provide dummy fallback values so that the supabase client can initialize 
// without throwing errors at build time. During runtime, the actual environment
// variables will be used correctly.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});
