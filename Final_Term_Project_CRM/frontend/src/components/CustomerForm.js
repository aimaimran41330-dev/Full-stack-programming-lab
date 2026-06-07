"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

const empty = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Lead",
  address: "",
  notes: "",
};

export default function CustomerForm({ initial, customerId }) {
  const router = useRouter();
  const [form, setForm] = useState(initial || empty);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(customerId);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "A valid email is required";
    if (!form.phone.trim()) return "Phone number is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/customers/${customerId}`, form);
        toast.success("Customer updated");
      } else {
        await api.post("/customers", form);
        toast.success("Customer created");
      }
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cust-form card fade-up">
      <div className="grid-2">
        <div className="field">
          <label>Full Name *</label>
          <input className="input" value={form.name} onChange={update("name")} placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label>Company</label>
          <input className="input" value={form.company} onChange={update("company")} placeholder="Acme Inc." />
        </div>
        <div className="field">
          <label>Email *</label>
          <input className="input" type="email" value={form.email} onChange={update("email")} placeholder="jane@acme.com" />
        </div>
        <div className="field">
          <label>Phone *</label>
          <input className="input" value={form.phone} onChange={update("phone")} placeholder="+1 555 0100" />
        </div>
        <div className="field">
          <label>Status</label>
          <select className="select" value={form.status} onChange={update("status")}>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="field">
          <label>Address</label>
          <input className="input" value={form.address} onChange={update("address")} placeholder="City, Country" />
        </div>
      </div>
      <div className="field">
        <label>Notes</label>
        <textarea className="textarea" value={form.notes} onChange={update("notes")} placeholder="Any relevant details…" />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={() => router.push("/dashboard")}>
          Cancel
        </button>
        <button className="btn btn-primary" disabled={saving}>
          {saving ? <span className="spinner" /> : isEdit ? "Save Changes" : "Create Customer"}
        </button>
      </div>

      <style jsx>{`
        .cust-form { padding: 28px; max-width: 720px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
        @media (max-width: 560px) { .grid-2 { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}
