"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";

const STATUSES = ["All", "Lead", "Active", "Inactive"];

export default function DashboardPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, leads: 0, inactive: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      const { data } = await api.get("/customers/stats/summary");
      setStats(data.data);
    } catch {
      /* ignore */
    }
  }, []);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (status !== "All") params.status = status;
      const { data } = await api.get("/customers", { params });
      setCustomers(data.data);
    } catch (err) {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  // Live search/filter — debounced, no page reload
  useEffect(() => {
    const t = setTimeout(loadCustomers, 250);
    return () => clearTimeout(t);
  }, [loadCustomers]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      toast.success("Customer deleted");
      setDeleting(null);
      loadCustomers();
      loadStats();
    } catch {
      toast.error("Delete failed");
    }
  };

  const statCards = [
    { label: "Total Customers", value: stats.total, tone: "ink" },
    { label: "Active", value: stats.active, tone: "active" },
    { label: "Leads", value: stats.leads, tone: "lead" },
    { label: "Inactive", value: stats.inactive, tone: "inactive" },
  ];

  return (
    <div className="fade-up">
      <header className="page-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Customers</h1>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/dashboard/customers/new")}
        >
          ＋ Add Customer
        </button>
      </header>

      <section className="stat-grid">
        {statCards.map((s) => (
          <div key={s.label} className={`stat card tone-${s.tone}`}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <div className="toolbar card">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="input search"
            placeholder="Search by name, email or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`chip ${status === s ? "chip-active" : ""}`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card table-card">
        {loading ? (
          <div className="table-state"><span className="spinner spinner-dark" /></div>
        ) : customers.length === 0 ? (
          <div className="table-state">
            <p>No customers found.</p>
            <span>Try adjusting your search or add a new customer.</span>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div className="cell-name">
                      <div className="mini-avatar">{c.name.charAt(0).toUpperCase()}</div>
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td>{c.company || "—"}</td>
                  <td>
                    <div className="cell-contact">
                      <span>{c.email}</span>
                      <span className="muted">{c.phone}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={c.status} /></td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => router.push(`/dashboard/customers/${c._id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleting(c)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleting && (
        <div className="modal-overlay" onClick={() => setDeleting(null)}>
          <div className="modal fade-up" onClick={(e) => e.stopPropagation()}>
            <h3>Delete customer?</h3>
            <p>
              This will permanently remove <strong>{deleting.name}</strong> from
              your CRM. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleting._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 26px; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: var(--ink-soft); font-weight: 600; }
        .page-head h1 { font-size: 40px; margin-top: 4px; }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 22px; }
        .stat { padding: 20px 22px; display: flex; flex-direction: column; gap: 4px; position: relative; overflow: hidden; }
        .stat::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--ink); }
        .stat.tone-active::before { background: var(--active); }
        .stat.tone-lead::before { background: var(--lead); }
        .stat.tone-inactive::before { background: var(--inactive); }
        .stat.tone-ink::before { background: var(--gold); }
        .stat-value { font-family: var(--font-display); font-size: 34px; font-weight: 600; }
        .stat-label { font-size: 13px; color: var(--ink-soft); }

        .toolbar { padding: 14px 16px; display: flex; gap: 16px; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; }
        .search-wrap { position: relative; flex: 1; min-width: 220px; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-soft); font-size: 16px; }
        .search { padding-left: 38px; }
        .filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip {
          padding: 8px 16px; border-radius: 100px; border: 1px solid var(--line);
          background: var(--surface); font-size: 13px; font-weight: 600; color: var(--ink-soft);
          transition: all 0.15s;
        }
        .chip:hover { border-color: var(--accent); }
        .chip-active { background: var(--accent); color: #fff; border-color: var(--accent); }

        .table-card { padding: 0; overflow: hidden; }
        .table { width: 100%; border-collapse: collapse; }
        .table th {
          text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--ink-soft); font-weight: 600; padding: 14px 20px; border-bottom: 1px solid var(--line);
        }
        .table td { padding: 14px 20px; border-bottom: 1px solid var(--line); font-size: 14px; vertical-align: middle; }
        .table tr:last-child td { border-bottom: none; }
        .table tbody tr { transition: background 0.12s; }
        .table tbody tr:hover { background: rgba(255, 255, 255, 0.025); }
        .cell-name { display: flex; align-items: center; gap: 12px; }
        .mini-avatar {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          background: var(--accent-soft); color: var(--accent);
          display: grid; place-items: center; font-weight: 700; font-size: 13px;
          font-family: var(--font-display);
        }
        .cell-contact { display: flex; flex-direction: column; }
        .muted { color: var(--ink-soft); font-size: 13px; }
        .row-actions { display: flex; gap: 6px; justify-content: flex-end; }
        .table-state { padding: 60px; display: grid; place-items: center; text-align: center; gap: 6px; }
        .table-state p { font-weight: 600; }
        .table-state span { color: var(--ink-soft); font-size: 14px; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(28,27,24,0.45);
          display: grid; place-items: center; z-index: 60; padding: 20px;
        }
        .modal { background: var(--surface); border-radius: var(--radius-lg); padding: 28px; max-width: 420px; box-shadow: var(--shadow-lg); }
        .modal h3 { font-size: 22px; margin-bottom: 10px; }
        .modal p { color: var(--ink-soft); line-height: 1.6; }
        .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; }

        @media (max-width: 900px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .page-head h1 { font-size: 30px; }
          .table thead { display: none; }
          .table, .table tbody, .table tr, .table td { display: block; width: 100%; }
          .table tr { padding: 12px 0; border-bottom: 1px solid var(--line); }
          .table td { border: none; padding: 6px 20px; }
          .row-actions { justify-content: flex-start; }
        }
      `}</style>
    </div>
  );
}
