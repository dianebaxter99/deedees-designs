"use client";

import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default function Dashboard() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    const { data, error } = await supabaseAdmin
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) return <p>Loading quotes...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl mb-4">Quote Requests</h1>

      {quotes.length === 0 ? (
        <p>No quotes found yet.</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{q.name}</h2>
              <p>Email: {q.email}</p>
              <p>Phone: {q.phone}</p>
              <p>Details: {q.details}</p>
              <p>Status: {q.status}</p>
              <p className="text-gray-600 text-sm">
                {new Date(q.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
