import { NextResponse } from "next/server";
import { generateToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === expectedUser && password === expectedPass) {
      const token = await generateToken(username, password);
      
      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      
      // Set the session cookie
      response.cookies.set("detox_admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day session duration
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Admin Login API] Error during authentication:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
