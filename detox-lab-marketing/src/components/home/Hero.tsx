"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, Sparkles, Send } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import GradientBlob from "@/components/ui/GradientBlob";
import GridBackdrop from "@/components/ui/GridBackdrop";

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <GridBackdrop />
      <div className="absolute inset-0 bg-radial-fade" />
      
      {/* Animated Glowing Blobs */}
      <GradientBlob
        variant="blue"
        className="left-[-10%] top-[-10%] h-[420px] w-[420px] animate-float-slow"
      />
      <GradientBlob
        variant="violet"
        className="right-[-10%] top-[10%] h-[380px] w-[380px] animate-float"
      />
      <GradientBlob
        variant="cyan"
        className="bottom-[-15%] left-[30%] h-[320px] w-[320px] animate-float-slow"
      />

      <Container className="relative">
        <motion.div style={{ y: yParallax }} className="mx-auto max-w-3xl text-center">
          {/* Hero Logo with premium glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: [
                "0 0 15px 2px rgba(59, 130, 246, 0.2)",
                "0 0 30px 8px rgba(34, 211, 238, 0.35)",
                "0 0 15px 2px rgba(59, 130, 246, 0.2)",
              ]
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, ease: "easeOut" },
              boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 border border-white/10"
          >
            <Image
              src="/logo.jpg"
              alt="Detox Labs Hero Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Subheadline Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-circuit-400/30 bg-circuit-400/5 px-4 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-circuit-300 font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-accent" />
            N8N AI Automation • Websites • Mobile Apps • Web Applications
          </motion.span>

          {/* Headline with Smooth Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
          >
            Automate, Scale & Grow Your Business{" "}
            <span className="bg-gradient-to-r from-circuit-300 via-circuit-400 to-cyan-accent bg-clip-text text-transparent">
              With AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-500"
          >
            Helping businesses automate workflows, generate leads, improve customer experience, and grow faster through modern technology solutions.
          </motion.p>

          {/* SaaS Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-ink-100 backdrop-blur-xl transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.03] sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Free Consultation
            </Link>
            <Link
              href="/services"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-7 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03] sm:w-auto"
            >
              View Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact?quote=true"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-ink-100 backdrop-blur-xl transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.03] sm:w-auto"
            >
              <Send className="h-4 w-4 text-circuit-300" />
              Get Free Quote
            </Link>
          </motion.div>

          {/* Floating visual elements (decorations) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-700"
          >
            <span>n8n automation</span>
            <span>websites</span>
            <span>mobile apps</span>
            <span>web apps</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
