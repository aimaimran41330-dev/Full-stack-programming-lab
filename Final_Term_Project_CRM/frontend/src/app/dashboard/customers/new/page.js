"use client";

import Link from "next/link";
import CustomerForm from "@/components/CustomerForm";

export default function NewCustomerPage() {
  return (
    <div>
      <header style={{ marginBottom: 26 }} className="fade-up">
        <Link href="/dashboard" style={{ color: "var(--ink-soft)", fontSize: 14, fontWeight: 600 }}>
          ← Back to dashboard
        </Link>
        <h1 style={{ fontSize: 40, marginTop: 8 }}>Add Customer</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 4 }}>
          Create a new customer record in your CRM.
        </p>
      </header>
      <CustomerForm />
    </div>
  );
}
