"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { ServiceItem } from "@/types";

export default function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="h-full p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-circuit-400/20 to-cyan-accent/10 ring-1 ring-circuit-400/30">
          <Icon className="h-6 w-6 text-circuit-300" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-ink-100">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {service.description}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-2.5">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-ink-300"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-circuit-400" />
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}
