"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/lib/api";
import CustomerForm from "@/components/CustomerForm";

export default function EditCustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/customers/${id}`);
        setCustomer(data.data);
      } catch {
        toast.error("Could not load customer");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div>
      <header style={{ marginBottom: 26 }} className="fade-up">
        <Link href="/dashboard" style={{ color: "var(--ink-soft)", fontSize: 14, fontWeight: 600 }}>
          ← Back to dashboard
        </Link>
        <h1 style={{ fontSize: 40, marginTop: 8 }}>Edit Customer</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 4 }}>
          Update this customer&apos;s information.
        </p>
      </header>

      {loading ? (
        <div style={{ display: "grid", placeItems: "center", padding: 60 }}>
          <span className="spinner spinner-dark" />
        </div>
      ) : customer ? (
        <CustomerForm initial={customer} customerId={id} />
      ) : (
        <p>Customer not found.</p>
      )}
    </div>
  );
}
