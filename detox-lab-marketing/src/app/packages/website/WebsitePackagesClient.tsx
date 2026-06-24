"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GridBackdrop from "@/components/ui/GridBackdrop";
import PricingCard from "@/components/pricing/PricingCard";
import ContactModal from "@/components/modals/ContactModal";
import CTASection from "@/components/home/CTASection";
import { websitePackages } from "@/data/websitePackages";

export default function WebsitePackagesClient() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  function handleSelect(name: string) {
    setSelected(name);
    setOpen(true);
  }

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20">
        <GridBackdrop />
        <Container>
          <SectionHeading
            eyebrow="Website & Web App Packages"
            title="Transparent pricing built for every stage of growth."
            description="Pick the package that matches where your business is today. Every tier includes responsive design, WhatsApp integration, and SEO fundamentals."
          />
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websitePackages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} index={i} onSelect={handleSelect} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink-700">
            Need something more custom? Mention it in your consultation and
            we&apos;ll scope it together.
          </p>
        </Container>
      </section>

      <CTASection />

      <ContactModal open={open} onClose={() => setOpen(false)} packageName={selected} />
    </>
  );
}
