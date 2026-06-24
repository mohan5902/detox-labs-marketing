"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Instagram, X } from "lucide-react";
import { SITE, buildWhatsAppLink } from "@/lib/utils";

export default function ContactModal({
  open,
  onClose,
  packageName,
}: {
  open: boolean;
  onClose: () => void;
  packageName?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-abyss p-7 shadow-glow"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ink-500 hover:text-ink-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="inline-flex items-center rounded-full border border-circuit-400/30 bg-circuit-400/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-circuit-300">
              {packageName ? "Get This Package" : "Let's Talk"}
            </span>

            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-100">
              {packageName ? packageName : "Get in touch"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              Contact us through any of the channels below to finalize your package or discuss custom specifications.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${SITE.phoneDial}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <span className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-circuit-400" />
                  <strong>Call Now</strong>
                </span>
                <span className="text-xs text-ink-500">{SITE.phone}</span>
              </a>
              <a
                href={buildWhatsAppLink(
                  packageName
                    ? `Hello Detox Labs, I am interested in the ${packageName}.`
                    : undefined
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 text-circuit-400" />
                  <strong>WhatsApp</strong>
                </span>
                <span className="text-xs text-ink-500">{SITE.whatsapp}</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-circuit-400" />
                  <strong>Email</strong>
                </span>
                <span className="text-xs text-ink-500 truncate max-w-[180px]">{SITE.email}</span>
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 transition-all hover:border-circuit-400/40 hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <span className="flex items-center gap-2.5">
                  <Instagram className="h-4 w-4 text-circuit-400" />
                  <strong>Instagram</strong>
                </span>
                <span className="text-xs text-ink-500">{SITE.instagram}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
