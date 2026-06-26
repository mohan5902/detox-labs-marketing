"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";
import GridBackdrop from "@/components/ui/GridBackdrop";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-4">
      <GridBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-abyss p-8 shadow-glow z-10"
      >
        <div className="text-center mb-8">
          <span className="inline-flex items-center rounded-full border border-circuit-400/30 bg-circuit-400/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-circuit-300">
            Control Panel
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-100">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Authorized personnel only. Log in to manage leads.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4.5 w-4.5 text-ink-700" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4.5 w-4.5 text-ink-700" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Logging in..." : "Access Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
