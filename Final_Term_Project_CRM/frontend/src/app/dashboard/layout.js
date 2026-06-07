"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Protected routing: redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <div className="spinner spinner-dark" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: "100%", overflow: "hidden" }}>
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
