"use client";

import { FormEvent, useState } from "react";

type QuoteStatus = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      garmentType: formData.get("garmentType"),
      serviceType: formData.get("serviceType"),
      quantity: formData.get("quantity"),
      placement: formData.get("placement"),
      deadline: formData.get("deadline"),
      notes: formData.get("notes"),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <h1>Custom Embroidery & Digitizing</h1>
        <p>
          High-quality embroidery for apparel, hats, uniforms, and more —
          proudly created by DeeDee’s Designs in Meridian, Idaho.
        </p>
        <a className="btn" href="#quote">
          Request a Quote
        </a>
      </section>

      {/* SERVICES */}
      <section className="section">
        <h2>What We Do</h2>
        <div className="container" style={{ textAlign: "center" }}>
          <p>• Embroidery</p>
          <p>• Digitizing</p>
          <p>• Custom Apparel</p>
          <p>• Bulk Orders</p>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section">
        <h2>How It Works</h2>
        <div className="container" style={{ textAlign: "center" }}>
          <p>1️⃣ Submit a Quote Request</p>
          <p>2️⃣ Receive a Digital Proof</p>
          <p>3️⃣ Approve Your Design</p>
          <p>4️⃣ Make Payment</p>
          <p>5️⃣ Production Begins</p>
          <p>6️⃣ Pickup or Shipping</p>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="section" id="quote">
        <div className="container">
          <h2>Request a Quote</h2>
          <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Tell us what you need and we’ll follow up with pricing and next steps.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              display: "grid",
              gap: "1rem",
            }}
          >
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="208-697-4010"
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="serviceType">Service *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                >
                  <option value="">Select a service</option>
                  <option value="embroidery">Embroidery</option>
                  <option value="digitizing">Digitizing</option>
                  <option value="apparel">Custom Apparel</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="garmentType">Garment / Item</label>
                <input
                  id="garmentType"
                  name="garmentType"
                  placeholder="Hats, polos, jackets, etc."
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="quantity">Estimated Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="24"
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="placement">Design Placement</label>
                <input
                  id="placement"
                  name="placement"
                  placeholder="Left chest, hat front, sleeve, etc."
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="deadline">Ideal Due Date</label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label htmlFor="notes">Project Details</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Tell us about your design, colors, placement, and any deadlines."
                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={status === "submitting"}
              style={{ justifySelf: "center", minWidth: "200px", textAlign: "center" }}
            >
              {status === "submitting" ? "Sending..." : "Submit Quote Request"}
            </button>

            {status === "success" && (
              <p style={{ color: "green", textAlign: "center" }}>
                Thank you! We’ve received your request and will follow up by email.
              </p>
            )}

            {status === "error" && (
              <p style={{ color: "red", textAlign: "center" }}>
                Something went wrong. Please try again or email contact@deedeedesignsllc.com.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* CONTACT FOOTER */}
      <footer>
        <p>Contact: contact@deedeedesignsllc.com | 208-697-4010</p>
        <p>Meridian, Idaho • Pickup & Shipping Available</p>
      </footer>
    </>
  );
}
