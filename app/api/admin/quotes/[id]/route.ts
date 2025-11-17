import { NextResponse } from "next/server";

// TEMP in-memory mock data
let quotes = [
  { id: "1", name: "Test User", email: "test@email.com", serviceType: "Embroidery", status: "new" },
  { id: "2", name: "Sarah", email: "sarah@email.com", serviceType: "Digitizing", status: "approved" },
];

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== "Bearer admin123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ quotes });
}
