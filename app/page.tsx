export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <h1>Custom Embroidery & Digitizing</h1>
        <p>
          High-quality embroidery for apparel, hats, uniforms, and more —
          proudly created by DeeDee’s Designs in Meridian, Idaho.
        </p>
        <a className="btn" href="#quote">Request a Quote</a>
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

      {/* CONTACT */}
      <footer>
        <p>Contact: contact@deedeedesignsllc.com | 208-697-4010</p>
        <p>Meridian, Idaho</p>
      </footer>
    </>
  );
}
