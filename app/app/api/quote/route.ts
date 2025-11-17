export async function POST(request: Request) {
  const data = await request.json();

  // For now, we just log it. Later we’ll:
  // - Save to the database
  // - Send an email notification
  console.log("New quote request:", data);

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
