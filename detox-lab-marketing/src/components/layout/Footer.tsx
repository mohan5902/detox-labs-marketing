import Link from "next/link";
import { Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { SITE, buildWhatsAppLink } from "@/lib/utils";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-abyss">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 shadow-glow border border-white/10 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Detox Labs Logo"
                width={26}
                height={26}
                className="object-contain"
              />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-ink-100">
              Detox<span className="text-circuit-400"> Labs</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            {SITE.tagline}. We build custom AI automation workflows, websites, web applications, and mobile apps for businesses ready to scale.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-700">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-500 transition-colors hover:text-circuit-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-700">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-ink-500">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-circuit-400" />
              <a href={`tel:${SITE.phoneDial}`} className="hover:text-circuit-300">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 text-circuit-400" />
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-circuit-300"
              >
                WhatsApp: {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-circuit-400" />
              <a href={`mailto:${SITE.email}`} className="hover:text-circuit-300">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram className="h-4 w-4 text-circuit-400" />
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-circuit-300"
              >
                {SITE.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-700">
            Get Started
          </h4>
          <p className="mt-5 text-sm text-ink-500">
            Tell us about your project and we&apos;ll recommend the right package for your budget and timeline.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-5 py-2.5 text-sm font-semibold text-void shadow-glow"
          >
            Book Free Consultation
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/5 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-ink-700 sm:flex-row">
          <p>© {new Date().getFullYear()} Detox Labs. All rights reserved.</p>
          <p className="font-mono">Operating fully online — no office, all access.</p>
        </Container>
      </div>
    </footer>
  );
}
