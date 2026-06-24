"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-circuit-400/30 bg-circuit-400/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-circuit-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent shadow-glow-cyan" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink-100 sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
