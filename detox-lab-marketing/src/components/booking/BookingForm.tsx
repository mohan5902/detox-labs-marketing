"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { saveLead } from "@/lib/leads";

const projectTypes = [
  "Website",
  "Web Application",
  "Mobile App",
  "Not sure yet",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    projectType: projectTypes[0],
    preferredDate: "",
    preferredTime: "",
    requirements: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      saveLead({
        source: "Booking Form",
        name: form.name,
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        goal: form.projectType as never,
        requirements: form.requirements,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
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
        <p className="mt-1 text-sm text-ink-500">
          We will reach out shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
        />
        <Field
          label="Business Name"
          value={form.businessName}
          onChange={(v) => update("businessName", v)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Phone Number"
          type="tel"
          required
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
          Project Type
        </label>
        <select
          value={form.projectType}
          onChange={(e) => update("projectType", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-abyss">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Preferred Date"
          type="date"
          value={form.preferredDate}
          onChange={(v) => update("preferredDate", v)}
        />
        <Field
          label="Preferred Time"
          type="time"
          value={form.preferredTime}
          onChange={(v) => update("preferredTime", v)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
          Additional Requirements
        </label>
        <textarea
          rows={4}
          value={form.requirements}
          onChange={(e) => update("requirements", e.target.value)}
          placeholder="Tell us a bit about your project..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none placeholder:text-ink-700 focus:border-circuit-400/50"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Book Free Consultation"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
        {label} {required && <span className="text-circuit-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none placeholder:text-ink-700 focus:border-circuit-400/50"
      />
    </div>
  );
}
