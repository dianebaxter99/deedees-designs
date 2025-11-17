import { NextResponse } from "next/server";

// This shares the same in-memory quotes array from the parent route
// (Vercel will keep it in memory for the session)
let quotes = [
  { id: "1", name: "John", email: "john@email.com", serviceType: "Embroidery", status: "new" },
  { id: "2", name: "Sarah", email: "sarah@email.com", serviceType: "Digitizing", status: "quoted" }
];

export async function PUT(req: Request, context: { params: { id: string } }) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = context.params.id;
  const body = await req.json();

  // Find quote
  const index = quotes.findIndex((q) => q.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  // Update the status
  quotes[index].status = body.status;

  return NextResponse.json({ success: true, quote: quotes[index] });
}
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { status } = body;

  const { error } = await supabaseAdmin
    .from("quotes")
    .update({ status })
    .eq("id", params.id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
