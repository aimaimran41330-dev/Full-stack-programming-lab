"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { authStyles } from "../login/page";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="logo">◆ Nexus<span>CRM</span></div>
          <h1>Start<br />in seconds.</h1>
          <p>
            Create your account to manage customers, generate invoices, and use
            the built-in assistant — all from one clean dashboard.
          </p>
        </div>
        <div className="auth-brand-foot">Air University · Full Stack Lab</div>
      </aside>

      <main className="auth-form-side">
        <div className="auth-form fade-up">
          <h2>Create account</h2>
          <p className="auth-sub">It only takes a moment to get started.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full name</label>
              <input
                className="input"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
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
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
              {loading ? <span className="spinner" /> : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already registered? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </main>

      <style jsx>{authStyles}</style>
    </div>
  );
}
