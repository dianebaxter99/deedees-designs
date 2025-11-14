import type { ReactNode } from "react";

export const metadata = {
  title: "DeeDee's Designs",
  description: "Embroidery quotes, proofs, approvals, and order tracking.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
