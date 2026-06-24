"use client";

import { motion } from "framer-motion";
import { Bot, Check, MessageSquare, Globe2, Sparkles, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SITE, buildWhatsAppLink } from "@/lib/utils";

const agentFeatures = [
  "Lead Collection",
  "AI Conversations",
  "Appointment Scheduling",
  "WhatsApp Integration",
  "Email Integration",
  "CRM Integration",
];

export default function N8NAgent() {
  return (
    <section id="n8n-agent" className="relative py-24 overflow-hidden bg-abyss border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-violet-accent/5 blur-[100px] animate-pulse-slow" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-circuit-500/10 blur-[100px] animate-pulse-slow" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Agent Information */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Specialized Solution"
              title="N8N AI Agent"
              description="Your autonomous agent designed to scale customer relationships."
              className="lg:mx-0"
            />
            
            <p className="mt-6 text-base leading-relaxed text-ink-500">
              An intelligent AI assistant that talks to customers, qualifies leads, schedules appointments, and helps businesses automate operations. Fully custom-built to match your brand voice.
            </p>

            {/* Supported Regions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-ink-300">
                <span className="text-base select-none">🇮🇳</span> Supported for Indian Customers
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-ink-300">
                <span className="text-base select-none">🇺🇸</span> Supported for International Customers
              </div>
            </div>

            {/* Features list */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {agentFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 text-sm text-ink-300">
                  <Check className="h-4.5 w-4.5 text-circuit-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent UI / Interactive Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="relative overflow-hidden p-6 border-white/10 shadow-glow hover:border-violet-accent/40 transition-colors duration-300">
              {/* Orb Visualization */}
              <div className="absolute right-4 top-4 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-accent"></span>
              </div>

              {/* Bot Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-circuit-500 to-cyan-accent text-void shadow-glow">
                  <Bot className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-ink-100">N8N AI Agent</h4>
                  <p className="text-[11px] text-circuit-300 font-mono">STATUS: ONLINE</p>
                </div>
              </div>

              {/* Chat Simulation Content */}
              <div className="mt-5 space-y-4 font-mono text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-ink-500">
                  <span className="text-cyan-accent">User:</span> Hey, I need a website with custom forms and WhatsApp automation.
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3 text-ink-300">
                  <span className="text-violet-accent font-bold">N8N AI Agent:</span> <br/>
                  I can definitely help you with that! For a responsive website with custom forms and WhatsApp integration, I recommend our <span className="text-circuit-300 underline font-semibold">Business Website Package</span> (starting at ₹18,000 / $1,500). <br/><br/>
                  Would you like to schedule a free call to outline your fields and triggers?
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-ink-500">
                  <span className="text-cyan-accent">User:</span> Yes, let&apos;s schedule ...
                </div>
              </div>

              {/* CTA button */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildWhatsAppLink("Hello Detox Labs, I would like to integrate an N8N AI Agent into my business.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-circuit-500 to-cyan-accent px-4 py-3 text-xs font-semibold text-void hover:scale-[1.02] transition-transform shadow-glow"
                >
                  <MessageCircle className="h-4 w-4" /> Integrate Agent Now
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
