"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { saveLead } from "@/lib/leads";

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "email",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await saveLead({
        source: "Contact Form",
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredContact: form.preferredContact,
        requirements: form.message,
        // defaults
        serviceRequired: "General Inquiry",
        businessType: "Not specified",
      });

      if (response.success) {
        setSuccessMessage(response.message);
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your fields and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-circuit-400/30 bg-circuit-400/5 p-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-circuit-400" />
        <p className="mt-4 font-display text-lg font-semibold text-ink-100">
          {successMessage || "Thank you for contacting Detox Labs."}
        </p>
        <p className="mt-2 text-sm text-ink-500 font-normal">
          Our team has received your request and will contact you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400"
        >
          <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Name <span className="text-circuit-400">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. John Doe"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Phone Number <span className="text-circuit-400">*</span>
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="e.g. +91 9361257216"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Email <span className="text-circuit-400">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="e.g. john@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Preferred Contact Method <span className="text-circuit-400">*</span>
          </label>
          <select
            value={form.preferredContact}
            onChange={(e) => setForm((f) => ({ ...f, preferredContact: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          >
            {contactMethods.map((method) => (
              <option key={method.value} value={method.value} className="bg-abyss">
                {method.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
          Message <span className="text-circuit-400">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your project or inquiry..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none placeholder:text-ink-700 focus:border-circuit-400/50"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
