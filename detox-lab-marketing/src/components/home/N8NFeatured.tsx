"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle, Zap, Cpu, Settings, Smartphone, Mail, Network, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const n8nServices = [
  { name: "AI Agents", icon: Bot, desc: "Autonomous agents resolving support tickets and handling queries." },
  { name: "Lead Qualification", icon: CheckCircle, desc: "Instant filtering and qualification of inbound traffic." },
  { name: "Appointment Booking", icon: Zap, desc: "AI booking links connected straight to Google Calendar/Cal.com." },
  { name: "WhatsApp Automation", icon: Smartphone, desc: "Send automated updates, offers, and replies directly to WhatsApp." },
  { name: "Email Automation", icon: Mail, desc: "Smart inbox routing, auto-draft replies, and follow-ups." },
  { name: "CRM Integration", icon: Network, desc: "Sync fields instantly across Salesforce, HubSpot, or custom databases." },
  { name: "Customer Support Automation", icon: Bot, desc: "24/7 self-service chat that knows your business rules." },
  { name: "Workflow Automation", icon: Settings, desc: "Ditch manual entry: automate tasks between 500+ apps." },
  { name: "Business Process Automation", icon: Cpu, desc: "Optimize repetitive workflows to scale operations cleanly." },
];

export default function N8NFeatured() {
  return (
    <section id="n8n-automation" className="relative py-24 overflow-hidden border-t border-white/5 bg-void">
      {/* Background Decorative Blobs */}
      <div className="absolute right-[5%] top-[10%] h-[300px] w-[300px] rounded-full bg-circuit-500/10 blur-[90px] animate-pulse-slow" />
      <div className="absolute left-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-cyan-accent/5 blur-[90px] animate-pulse-slow" />

      <Container>
        <SectionHeading
          eyebrow="Featured Service"
          title="N8N AI Automation"
          description="Your 24/7 AI Business Assistant"
        />

        <div className="mt-6 mx-auto max-w-2xl text-center">
          <p className="text-base leading-relaxed text-ink-500">
            Automate repetitive tasks, capture leads, manage customer communication, schedule appointments, and streamline operations with custom AI workflows.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {n8nServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <GlassCard className="relative overflow-hidden p-6 group hover:border-circuit-400/40 hover:shadow-glow transition-all duration-300 flex flex-col h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-circuit-400/20 to-cyan-accent/10 ring-1 ring-circuit-400/30 group-hover:scale-110 transition-transform">
                  <service.icon className="h-5 w-5 text-circuit-300" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-100 group-hover:text-circuit-300 transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">
                  {service.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/packages"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-6 py-3 text-xs font-semibold text-void shadow-glow hover:scale-105 transition-transform"
          >
            Explore AI Packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
