"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-8">We'd love to hear from you. Get in touch!</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Name *</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Email *</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Subject</label>
              <input
                type="text" value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Message *</label>
              <textarea
                required rows={6} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary resize-none"
                placeholder="Tell us more..."
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 font-semibold hover:bg-primary-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: <FaPhone />, title: "Phone", info: "07584 031409" },
            { icon: <FaEnvelope />, title: "Email", info: "info@rustikplank.com" },
            { icon: <FaMapMarkerAlt />, title: "Address", info: "Islamabad, Pakistan" },
            { icon: <FaClock />, title: "Hours", info: "Mon–Sat: 9am – 6pm" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="bg-primary text-white p-3 text-lg">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
