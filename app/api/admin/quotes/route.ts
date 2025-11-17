import { NextResponse } from "next/server";

// Temporary in-memory data
let quotes = [
  { id: "1", name: "John", email: "john@email.com", serviceType: "Embroidery", status: "new" },
  { id: "2", name: "Sarah", email: "sarah@email.com", serviceType: "Digitizing", status: "quoted" }
];

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ quotes });
}
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ quotes: data });
}
