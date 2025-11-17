import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let quotes: any[] = []; // temporary — replace with DB later

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const quote = quotes.find((q) => q.id === params.id);

  if (!quote) {
    return new NextResponse("Not found", { status: 404 });
  }

  quote.status = body.status;

  return NextResponse.json({ ok: true });
}
