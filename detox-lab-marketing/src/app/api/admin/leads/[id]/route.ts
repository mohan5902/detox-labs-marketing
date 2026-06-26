import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/adminAuth";

// PATCH (Update status)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ["New", "Contacted", "Closed"];
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be 'New', 'Contacted', or 'Closed'." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`[Admin Lead PATCH] DB Error for ID ${id}:`, error);
      return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Lead status updated successfully",
      lead: data,
    });
  } catch (error) {
    console.error("[Admin Lead PATCH] Exception:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred updating lead status." },
      { status: 500 }
    );
  }
}

// DELETE (Delete lead)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;

    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      console.error(`[Admin Lead DELETE] DB Error for ID ${id}:`, error);
      return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("[Admin Lead DELETE] Exception:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred deleting the lead." },
      { status: 500 }
    );
  }
}
