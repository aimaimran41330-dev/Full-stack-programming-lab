"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(30, 34, 46, 0.92)",
          color: "#eef0f6",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
        },
        success: { iconTheme: { primary: "#5fd0a0", secondary: "#1e222e" } },
        error: { iconTheme: { primary: "#ff8c8c", secondary: "#1e222e" } },
      }}
    />
  );
}
