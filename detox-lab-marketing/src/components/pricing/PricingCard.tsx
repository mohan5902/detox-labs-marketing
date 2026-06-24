"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import { PackageFeatureSet } from "@/types";

export default function PricingCard({
  pkg,
  index,
  onSelect,
  extra,
}: {
  pkg: PackageFeatureSet;
  index: number;
  onSelect: (name: string) => void;
  extra?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassCard
        className={cn(
          "flex h-full flex-col p-7",
          pkg.highlighted &&
            "border-circuit-400/50 bg-gradient-to-b from-circuit-400/[0.08] to-transparent shadow-glow"
        )}
      >
        {pkg.badge && (
          <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-3 py-1 text-[11px] font-semibold text-void">
            <Sparkles className="h-3 w-3" /> {pkg.badge}
          </span>
        )}

        <h3 className="font-display text-xl font-semibold text-ink-100">
          {pkg.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-3xl font-bold text-ink-100">
            {pkg.price}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-circuit-300">
          Delivery: {pkg.delivery}
        </p>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-300">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-circuit-400" />
              {feature}
            </li>
          ))}
        </ul>

        {extra}

        <button
          onClick={() => onSelect(pkg.name)}
          className={cn(
            "mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]",
            pkg.highlighted
              ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void shadow-glow"
              : "border border-white/15 bg-white/[0.04] text-ink-100 hover:border-circuit-400/40"
          )}
        >
          Get This Package
        </button>
      </GlassCard>
    </motion.div>
  );
}
