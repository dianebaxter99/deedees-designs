import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET all quotes
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin.from("quotes").select("*");

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ quotes: data });
}

// CREATE a quote (optional if needed)
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("quotes")
    .insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service_type: body.serviceType,
      description: body.description,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, quote: data });
}
