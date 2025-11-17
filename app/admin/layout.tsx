"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthed = localStorage.getItem("admin-auth");
    if (!isAuthed) {
      router.push("/admin/login");
    }
  }, [router]);

  return <div>{children}</div>;
}
