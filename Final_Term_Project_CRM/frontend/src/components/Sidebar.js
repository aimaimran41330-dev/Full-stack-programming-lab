"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/dashboard/customers/new", label: "Add Customer", icon: "＋" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "▤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sb-logo">◆ Nexus<span>CRM</span></div>

      <nav className="sb-nav">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sb-link ${active ? "active" : ""}`}
            >
              <span className="sb-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="sb-user-info">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={logout}>
          Logout
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          flex-shrink: 0;
          background: var(--surface);
          border-right: 1px solid var(--line);
          padding: 26px 18px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sb-logo {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          padding: 0 8px 24px;
        }
        .sb-logo span { color: var(--gold); }
        .sb-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .sb-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-soft);
          transition: all 0.15s;
        }
        .sb-link:hover { background: var(--surface-2); color: var(--ink); }
        .sb-link.active { background: var(--accent); color: #fff; }
        .sb-icon { font-size: 16px; width: 18px; text-align: center; }
        .sb-foot { border-top: 1px solid var(--line); padding-top: 16px; }
        .sb-user { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding: 0 4px; }
        .sb-avatar {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--accent-soft); color: var(--accent);
          display: grid; place-items: center; font-weight: 700;
          font-family: var(--font-display);
        }
        .sb-user-info { display: flex; flex-direction: column; overflow: hidden; }
        .sb-user-info strong { font-size: 14px; }
        .sb-user-info span { font-size: 12px; color: var(--ink-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        @media (max-width: 760px) {
          .sidebar {
            width: 100%; height: auto; position: relative;
            flex-direction: row; align-items: center;
            padding: 12px 16px; flex-wrap: wrap;
          }
          .sb-logo { padding: 0; }
          .sb-nav { flex-direction: row; flex: 1; justify-content: center; gap: 2px; }
          .sb-link { padding: 8px 10px; }
          .sb-link span:not(.sb-icon) { display: none; }
          .sb-foot { border: none; padding: 0; }
          .sb-user { display: none; }
        }
      `}</style>
    </aside>
  );
}
