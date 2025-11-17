import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let quotes: any[] = []; // temporary — will be replaced by DB

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json({ quotes });
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = Math.random().toString(36).substring(2, 10);

  quotes.push({
    id,
    status: "new",
    ...body,
  });

  return NextResponse.json({ ok: true });
}
