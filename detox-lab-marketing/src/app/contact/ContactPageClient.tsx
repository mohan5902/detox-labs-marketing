"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GridBackdrop from "@/components/ui/GridBackdrop";
import GlassCard from "@/components/ui/GlassCard";
import ContactForm from "@/components/booking/ContactForm";
import BookingForm from "@/components/booking/BookingForm";
import { SITE, buildWhatsAppLink } from "@/lib/utils";

const channels = [
  {
    label: "Call Us",
    value: SITE.phone,
    href: `tel:${SITE.phoneDial}`,
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: SITE.whatsapp,
    href: buildWhatsAppLink(),
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
  {
    label: "Instagram",
    value: SITE.instagram,
    href: SITE.instagramUrl,
    icon: Instagram,
    external: true,
  },
];

export default function ContactPageClient() {
  const [tab, setTab] = useState<"message" | "booking">("message");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20">
        <GridBackdrop />
        <Container>
          <SectionHeading
            eyebrow="Contact Us"
            title="We operate fully online — and we&apos;re easy to reach."
            description="No office, no maps, no waiting rooms. Reach us directly and we&apos;ll respond personally."
          />
        </Container>
      </section>

      <section className="relative pb-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {channels.map((channel, i) => (
              <motion.a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-circuit-400/40 hover:bg-white/[0.04]"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-circuit-400/20 to-cyan-accent/10 ring-1 ring-circuit-400/30">
                  <channel.icon className="h-5 w-5 text-circuit-300" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-700">
                    {channel.label}
                  </p>
                  <p className="font-display text-sm font-semibold text-ink-100">
                    {channel.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <GlassCard className="p-7 sm:p-9">
            <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button
                onClick={() => setTab("message")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  tab === "message"
                    ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void"
                    : "text-ink-500"
                }`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setTab("booking")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  tab === "booking"
                    ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void"
                    : "text-ink-500"
                }`}
              >
                Book an Appointment
              </button>
            </div>

            {tab === "message" ? <ContactForm /> : <BookingForm />}
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
