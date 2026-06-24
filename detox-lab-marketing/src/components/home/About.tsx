"use client";

import { motion } from "framer-motion";
import { Globe, LayoutDashboard, Smartphone, Bot } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const aboutItems = [
  { icon: Bot, label: "N8N AI Automation", desc: "Automating workflows, scheduling, email, and WhatsApp routing." },
  { icon: Globe, label: "Website Development", desc: "SaaS landing pages, portfolio websites, and corporate platforms." },
  { icon: Smartphone, label: "Mobile App Development", desc: "High-performance cross-platform iOS & Android mobile apps." },
  { icon: LayoutDashboard, label: "Web Application Development", desc: "Custom dashboards, CRMs, and complex business software." },
];

export default function About() {
  return (
    <section id="about-us" className="relative py-24 bg-void">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="About Detox Labs"
          title="An AI Automation & Digital Solutions Agency built for speed and growth."
          description="Detox Labs is an international software development and workflow automation agency. We design and launch high-performance websites, custom web tools, cross-platform mobile applications, and complex n8n AI integrations. We prioritize conversions, security, and sub-second load times."
          className="lg:mx-0"
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="space-y-3 p-3">
            {aboutItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-circuit-400/20 to-cyan-accent/10 ring-1 ring-circuit-400/30">
                  <item.icon className="h-5 w-5 text-circuit-300" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-ink-100">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}
