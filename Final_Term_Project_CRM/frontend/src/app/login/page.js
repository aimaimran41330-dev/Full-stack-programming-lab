"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="logo">◆ Nexus<span>CRM</span></div>
          <h1>Relationships,<br />refined.</h1>
          <p>
            Manage customers, track status, generate invoices and stay on top
            of every conversation — all in one calm workspace.
          </p>
        </div>
        <div className="auth-brand-foot">Air University · Full Stack Lab</div>
      </aside>

      <main className="auth-form-side">
        <div className="auth-form fade-up">
          <h2>Sign in</h2>
          <p className="auth-sub">Enter your credentials to access the dashboard.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="admin@crm.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign in"}
            </button>
          </form>

          <div className="demo-hint">
            Demo login → <strong>admin@crm.com</strong> / <strong>admin123</strong>
          </div>

          <p className="auth-switch">
            No account? <Link href="/register">Create one</Link>
          </p>
        </div>
      </main>

      <style jsx>{authStyles}</style>
    </div>
  );
}

export const authStyles = `
  .auth-wrap { display: grid; grid-template-columns: 1.05fr 1fr; min-height: 100vh; }
  .auth-brand {
    color: #eef0f6;
    padding: 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(700px 480px at 18% 12%, rgba(108,124,255,0.28), transparent 60%),
      radial-gradient(600px 520px at 90% 95%, rgba(95,208,160,0.12), transparent 55%),
      linear-gradient(160deg, #0e1018 0%, #090a0e 100%);
    border-right: 1px solid var(--line);
  }
  /* faint dotted grid texture */
  .auth-brand::before {
    content: "";
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: radial-gradient(circle at 30% 30%, black, transparent 75%);
    opacity: 0.6;
  }
  .auth-brand::after {
    content: "";
    position: absolute;
    width: 360px; height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(217,183,121,0.16), transparent 70%);
    bottom: -120px; right: -100px;
  }
  .auth-brand-inner { position: relative; z-index: 1; max-width: 440px; margin-top: 64px; }
  .logo { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: -0.03em; }
  .logo span { color: var(--gold); }
  .auth-brand h1 {
    font-size: 56px; margin: 44px 0 22px; color: #fff;
    background: linear-gradient(180deg, #ffffff, #c8ccdb);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .auth-brand p { font-size: 16px; line-height: 1.65; color: var(--ink-soft); }
  .auth-brand-foot { position: relative; z-index: 1; font-size: 12px; color: var(--ink-faint); letter-spacing: 0.12em; text-transform: uppercase; }

  .auth-form-side { display: grid; place-items: center; padding: 40px; background: var(--paper); }
  .auth-form { width: 100%; max-width: 384px; }
  .auth-form h2 { font-size: 34px; }
  .auth-sub { color: var(--ink-soft); margin: 10px 0 30px; }
  .demo-hint {
    margin-top: 18px; padding: 12px 14px;
    background: var(--accent-soft); border: 1px solid var(--line-strong); border-radius: 10px;
    font-size: 13px; color: var(--ink);
  }
  .demo-hint strong { color: var(--accent-hover); }
  .auth-switch { margin-top: 24px; font-size: 14px; color: var(--ink-soft); }
  .auth-switch a { color: var(--accent-hover); font-weight: 600; }

  @media (max-width: 860px) {
    .auth-wrap { grid-template-columns: 1fr; }
    .auth-brand { display: none; }
  }
`;
