import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("quotes")
    .update({ status: body.status })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database update failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, quote: data });
}
