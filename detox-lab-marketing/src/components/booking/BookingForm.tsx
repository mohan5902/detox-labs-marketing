"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { saveLead } from "@/lib/leads";

const projectTypes = [
  "N8N AI Automation",
  "Website Development",
  "Mobile App Development",
  "Web Application Development",
  "Not sure yet",
];

const businessTypes = [
  "Startup",
  "E-commerce",
  "Agency / Consulting",
  "Local Business",
  "Personal Brand",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not sure / TBD",
];

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    businessType: businessTypes[0],
    email: "",
    phone: "",
    projectType: projectTypes[1], // Default to Website Development
    budget: budgetRanges[0],
    preferredContact: "email",
    preferredDate: "",
    preferredTime: "",
    requirements: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await saveLead({
        source: "Booking Form",
        name: form.name,
        businessName: form.businessName,
        businessType: form.businessType,
        email: form.email,
        phone: form.phone,
        serviceRequired: form.projectType,
        budget: form.budget,
        preferredContact: form.preferredContact,
        requirements: form.requirements,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
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
        <p className="mt-2 text-sm text-ink-500">
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
        <Field
          label="Name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="e.g. John Doe"
        />
        <Field
          label="Business Name"
          value={form.businessName}
          onChange={(v) => update("businessName", v)}
          placeholder="e.g. Acme Corp"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="e.g. john@example.com"
        />
        <Field
          label="Phone Number"
          type="tel"
          required
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder="e.g. +91 9361257216"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Project Type <span className="text-circuit-400">*</span>
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

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Business Type <span className="text-circuit-400">*</span>
          </label>
          <select
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          >
            {businessTypes.map((type) => (
              <option key={type} value={type} className="bg-abyss">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Estimated Budget <span className="text-circuit-400">*</span>
          </label>
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
          >
            {budgetRanges.map((budget) => (
              <option key={budget} value={budget} className="bg-abyss">
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
            Preferred Contact Method <span className="text-circuit-400">*</span>
          </label>
          <select
            value={form.preferredContact}
            onChange={(e) => update("preferredContact", e.target.value)}
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
          placeholder="Tell us a bit about your project goals, features, or timeline..."
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
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 outline-none placeholder:text-ink-700 focus:border-circuit-400/50"
      />
    </div>
  );
}
