"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import GradientBlob from "@/components/ui/GradientBlob";

export default function CTASection() {
  return (
    <section className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-abyss to-void p-10 text-center sm:p-16"
        >
          <GradientBlob variant="blue" className="left-1/4 top-0 h-72 w-72 animate-float-slow" />
          <GradientBlob variant="cyan" className="right-1/4 bottom-0 h-64 w-64 animate-float" />

          <h2 className="relative font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
            Ready to build something that grows with you?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-ink-500">
            Book a free consultation and we&apos;ll recommend the right
            package for your business, budget, and timeline.
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-7 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03]"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
