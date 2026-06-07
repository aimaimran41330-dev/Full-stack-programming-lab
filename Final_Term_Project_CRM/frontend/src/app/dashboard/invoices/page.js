"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function InvoicesPage() {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [creating, setCreating] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const loadCustomers = async () => {
    try {
      const { data } = await api.get("/customers");
      setCustomers(data.data);
    } catch { /* ignore */ }
  };
  const loadInvoices = async () => {
    try {
      const { data } = await api.get("/invoices");
      setInvoices(data.data);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    loadCustomers();
    loadInvoices();
  }, []);

  const total = items.reduce(
    (sum, it) => sum + Number(it.quantity || 0) * Number(it.price || 0),
    0
  );

  const updateItem = (i, key, value) => {
    const next = [...items];
    next[i][key] = value;
    setItems(next);
  };
  const addItem = () => setItems([...items, { description: "", quantity: 1, price: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!customerId) return toast.error("Select a customer");
    if (items.some((it) => !it.description.trim())) {
      return toast.error("Every item needs a description");
    }
    setCreating(true);
    try {
      const payload = {
        customerId,
        items: items.map((it) => ({
          description: it.description,
          quantity: Number(it.quantity),
          price: Number(it.price),
        })),
      };
      await api.post("/invoices", payload);
      toast.success("Invoice generated");
      setItems([{ description: "", quantity: 1, price: 0 }]);
      setCustomerId("");
      loadInvoices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate invoice");
    } finally {
      setCreating(false);
    }
  };

  const downloadPDF = async (invoice) => {
    setDownloadingId(invoice._id);
    try {
      const res = await api.get(`/invoices/${invoice._id}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="fade-up">
      <header style={{ marginBottom: 26 }}>
        <p className="eyebrow">Billing</p>
        <h1>Invoices</h1>
      </header>

      <div className="inv-grid">
        <form className="card inv-form" onSubmit={handleCreate}>
          <h3>Generate Invoice</h3>

          <div className="field">
            <label>Customer</label>
            <select
              className="select"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Select a customer…</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} {c.company ? `— ${c.company}` : ""}
                </option>
              ))}
            </select>
          </div>

          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)" }}>
            Line Items
          </label>
          <div className="items">
            {items.map((it, i) => (
              <div className="item-row" key={i}>
                <input
                  className="input"
                  placeholder="Service / product"
                  value={it.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                />
                <input
                  className="input qty"
                  type="number"
                  min="1"
                  value={it.quantity}
                  onChange={(e) => updateItem(i, "quantity", e.target.value)}
                />
                <input
                  className="input price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={it.price}
                  onChange={(e) => updateItem(i, "price", e.target.value)}
                />
                {items.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeItem(i)}>
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={addItem}>
            ＋ Add item
          </button>

          <div className="total-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="btn btn-primary" style={{ width: "100%" }} disabled={creating}>
            {creating ? <span className="spinner" /> : "Generate Invoice"}
          </button>
        </form>

        <div className="card inv-list">
          <h3>Recent Invoices</h3>
          {invoices.length === 0 ? (
            <p className="empty">No invoices yet. Generate one to get started.</p>
          ) : (
            <ul>
              {invoices.map((inv) => (
                <li key={inv._id}>
                  <div>
                    <strong>{inv.invoiceNumber}</strong>
                    <span>{inv.customerName} · {new Date(inv.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="inv-right">
                    <span className="amount">${inv.total.toFixed(2)}</span>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => downloadPDF(inv)}
                      disabled={downloadingId === inv._id}
                    >
                      {downloadingId === inv._id ? "…" : "↓ PDF"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style jsx>{`
        .eyebrow { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: var(--ink-soft); font-weight: 600; }
        h1 { font-size: 40px; margin-top: 4px; }
        .inv-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 20px; align-items: start; }
        .inv-form { padding: 26px; }
        .inv-form h3, .inv-list h3 { font-size: 20px; margin-bottom: 18px; }
        .items { display: flex; flex-direction: column; gap: 8px; margin: 6px 0 12px; }
        .item-row { display: grid; grid-template-columns: 1fr 70px 100px auto; gap: 8px; align-items: center; }
        .qty, .price { text-align: right; }
        .remove { background: var(--danger-bg); color: var(--danger); border: none; width: 32px; height: 38px; border-radius: 8px; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; margin: 8px 0 16px; border-top: 1px solid var(--line); }
        .total-row span { color: var(--ink-soft); }
        .total-row strong { font-family: var(--font-display); font-size: 26px; }

        .inv-list { padding: 26px; }
        .inv-list ul { list-style: none; display: flex; flex-direction: column; }
        .inv-list li { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line); }
        .inv-list li:last-child { border-bottom: none; }
        .inv-list li div:first-child { display: flex; flex-direction: column; }
        .inv-list li span { font-size: 13px; color: var(--ink-soft); }
        .inv-right { display: flex; align-items: center; gap: 12px; }
        .amount { font-family: var(--font-display); font-weight: 600; color: var(--ink) !important; font-size: 16px; }
        .empty { color: var(--ink-soft); font-size: 14px; }

        @media (max-width: 880px) { .inv-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
