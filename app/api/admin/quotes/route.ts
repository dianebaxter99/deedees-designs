import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// GET all quotes (admin dashboard)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET quotes error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// UPDATE quote status
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("quotes")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("PUT quotes update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
