"use client";

import { useState } from "react";
import { Briefcase, ThumbsUp } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GridBackdrop from "@/components/ui/GridBackdrop";
import PricingCard from "@/components/pricing/PricingCard";
import ContactModal from "@/components/modals/ContactModal";
import CTASection from "@/components/home/CTASection";
import { mobileAppPackages } from "@/data/mobileAppPackages";

export default function MobileAppPackagesClient() {
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
            eyebrow="Mobile App Packages"
            title="From a first launch to enterprise scale."
            description="Android, iOS, and cross-platform mobile apps with the backend, admin tooling, and support each business stage actually needs."
          />
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mobileAppPackages.map((pkg, i) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                onSelect={handleSelect}
                extra={
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-start gap-2.5 text-xs text-ink-500">
                      <Briefcase className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-circuit-400" />
                      <span>{pkg.suitableFor}</span>
                    </div>
                    {pkg.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-2.5 text-xs text-ink-500"
                      >
                        <ThumbsUp className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-circuit-400" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />

      <ContactModal open={open} onClose={() => setOpen(false)} packageName={selected} />
    </>
  );
}
