"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { saveLead } from "@/lib/leads";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      saveLead({
        source: "Contact Form",
        name: form.name,
        email: form.email,
        phone: form.phone,
        requirements: form.message,
      });
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
          Thank you for contacting Detox Lab Marketing.
        </p>
        <p className="mt-1 text-sm text-ink-500">We will reach out shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Phone Number
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
          Email
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your project..."
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
