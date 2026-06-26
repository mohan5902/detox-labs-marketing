import { cookies } from "next/headers";

const FALLBACK_SECRET = "detox_labs_secure_fallback_secret_key";

/**
 * Generate a SHA-256 stateless session token for admin authentication.
 */
export async function generateToken(username: string, passwordHash: string): Promise<string> {
  const secret =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env.SUPABASE_ANON_KEY ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] ||
    FALLBACK_SECRET;
  const data = `${username}:${passwordHash}:${secret}`;
  
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify if the request has a valid admin session cookie.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("detox_admin_session")?.value;
    if (!sessionCookie) return false;

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "admin123";
    const expectedToken = await generateToken(expectedUser, expectedPass);

    return sessionCookie === expectedToken;
  } catch (error) {
    console.error("[Admin Auth] Session verification error:", error);
    return false;
  }
}
