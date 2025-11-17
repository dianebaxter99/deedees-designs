"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadQuotes() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quotes", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setQuotes(data.quotes);
      setAuthed(true);
    } catch {
      setError("Invalid password or server error.");
      setAuthed(false);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/quotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ status }),
    });

    loadQuotes();
  }

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem",
            marginTop: "1rem",
            width: "100%",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <button onClick={loadQuotes} style={{ marginTop: "1rem" }}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>Admin Dashboard</h1>
      <p>Logged in as admin</p>

      {loading && <p>Loading...</p>}

      {!loading && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "2rem",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Service</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((q) => (
              <tr key={q.id}>
                <td style={td}>{q.name}</td>
                <td style={td}>{q.email}</td>
                <td style={td}>{q.serviceType}</td>
                <td style={td}>{q.status}</td>
                <td style={td}>
                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(q.id, e.target.value)}
                    style={{ padding: "0.3rem" }}
                  >
                    <option value="new">New</option>
                    <option value="quoted">Quoted</option>
                    <option value="approved">Approved</option>
                    <option value="paid">Paid</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ----------------------
// FIXED STYLE OBJECTS
// ----------------------

const th: any = {
  borderBottom: "1px solid #ddd",
  padding: "0.5rem",
  textAlign: "left",
};

const td: any = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};
