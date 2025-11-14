import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "DeeDee's Designs",
  description: "Custom embroidery, digitizing, and apparel.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
