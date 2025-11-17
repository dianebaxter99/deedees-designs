import { NextResponse } from "next/server";

// Temporary in-memory data
let quotes = [
  { id: "1", name: "John", email: "john@email.com", serviceType: "Embroidery", status: "new" },
  { id: "2", name: "Sarah", email: "sarah@email.com", serviceType: "Digitizing", status: "quoted" }
];

export async function PUT(req: Request, { params }: any) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const quote = quotes.find((q) => q.id === id);
  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  quote.status = body.status;

  return NextResponse.json({ success: true, quote });
}
