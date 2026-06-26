import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    // 1. Authenticate session
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "all";
    const service = searchParams.get("service") || "all";
    const source = searchParams.get("source") || "all";
    const preferredContact = searchParams.get("preferredContact") || "all";

    // 2. Build query
    let query = supabase.from("leads").select("*", { count: "exact" });

    if (status !== "all") {
      query = query.eq("status", status);
    }
    if (service !== "all") {
      query = query.eq("service_required", service);
    }
    if (source !== "all") {
      query = query.eq("source", source);
    }
    if (preferredContact !== "all") {
      query = query.eq("preferred_contact", preferredContact);
    }

    if (q.trim()) {
      // Clean query of characters like commas, brackets, etc., which break Supabase .or filter
      const cleanQ = q.replace(/[,()]/g, "").trim();
      query = query.or(
        `full_name.ilike.%${cleanQ}%,email.ilike.%${cleanQ}%,phone.ilike.%${cleanQ}%,company_name.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`
      );
    }

    // Always sort newer leads first
    query = query.order("created_at", { ascending: false });

    const { data: leads, count, error } = await query;

    if (error) {
      console.error("[Admin Leads GET] Supabase query error:", error);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      leads,
      count,
    });
  } catch (error) {
    console.error("[Admin Leads GET] Exception:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred retrieving leads." },
      { status: 500 }
    );
  }
}
