"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Client Feedback"
          title="What businesses say after launch."
          description="Placeholder testimonials — swap these for real client quotes as your portfolio grows."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="h-full p-7">
                <Quote className="h-6 w-6 text-circuit-400/50" />
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink-100">
                      {t.name}
                    </p>
                    <p className="text-xs text-ink-700">
                      {t.role}, {t.business}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-circuit-400 text-circuit-400"
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
