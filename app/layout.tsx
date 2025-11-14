import "./globals.css";
import type { ReactNode } from "react";
import Image from "next/image";

export const metadata = {
  title: "DeeDee's Designs",
  description: "Custom embroidery, digitizing, and apparel.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          background: "#fff",
        }}>
          <div className="container" style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <Image
              src="/logo.png"
              alt="DeeDee's Designs Logo"
              width={60}
              height={60}
            />
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>DeeDee’s Designs</h1>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
