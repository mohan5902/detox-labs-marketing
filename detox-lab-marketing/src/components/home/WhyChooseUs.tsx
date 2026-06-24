"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/data/services";

export default function WhyChooseUs() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built to earn trust, not just hit a deadline."
          description="Every package includes the fundamentals that make a website or app actually work for your business."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] ||
              Icons.Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-circuit-400/30 hover:bg-white/[0.04]"
              >
                <Icon className="h-6 w-6 text-circuit-300" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-base font-semibold text-ink-100">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
