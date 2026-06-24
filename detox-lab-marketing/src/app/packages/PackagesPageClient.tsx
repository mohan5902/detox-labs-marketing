"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GridBackdrop from "@/components/ui/GridBackdrop";
import PricingCard from "@/components/pricing/PricingCard";
import ContactModal from "@/components/modals/ContactModal";
import CTASection from "@/components/home/CTASection";
import { packagesData } from "@/data/packagesData";

const categories = [
  { key: "n8n", label: "N8N AI Automation" },
  { key: "website", label: "Website Development" },
  { key: "mobile", label: "Mobile App Development" },
  { key: "webapp", label: "Web Application" },
];

export default function PackagesPageClient() {
  const [region, setRegion] = useState<"india" | "international">("india");
  const [activeCategory, setActiveCategory] = useState<string>("n8n");
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();

  function handleSelectPackage(packageName: string) {
    const regionSymbol = region === "india" ? "🇮🇳" : "🇺🇸";
    setSelectedPackage(`${packageName} (${regionSymbol})`);
    setOpen(true);
  }

  const activeCategoryData = packagesData[activeCategory];
  const activePackages = region === "india" ? activeCategoryData.india : activeCategoryData.international;

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-20">
        <GridBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="Pricing Plans"
            title="Premium services at transparent rates"
            description="Accelerate your workflow efficiency and digital reach. Toggle between Indian and International plans below."
          />

          {/* Region Toggle */}
          <div className="mt-10 flex justify-center">
            <div className="relative inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1.5 shadow-glow">
              <button
                onClick={() => setRegion("india")}
                className={`relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  region === "india"
                    ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void"
                    : "text-ink-500 hover:text-ink-200"
                }`}
              >
                🇮🇳 India
              </button>
              <button
                onClick={() => setRegion("international")}
                className={`relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  region === "international"
                    ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void"
                    : "text-ink-500 hover:text-ink-200"
                }`}
              >
                🇺🇸 International
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 border-b border-white/5 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-all border ${
                  activeCategory === cat.key
                    ? "border-circuit-400/50 bg-circuit-400/10 text-circuit-300"
                    : "border-transparent text-ink-500 hover:text-ink-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Cards Grid */}
      <section className="relative pb-24 min-h-[400px]">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${region}-${activeCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center"
            >
              {activePackages.map((pkg, i) => (
                <PricingCard
                  key={pkg.id}
                  pkg={{
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price,
                    delivery: pkg.delivery,
                    badge: pkg.badge,
                    highlighted: pkg.highlighted,
                    features: pkg.features,
                  }}
                  index={i}
                  onSelect={handleSelectPackage}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-12 text-center text-sm text-ink-700">
            Need custom automation parameters or an enterprise service level agreement?
            <br />
            Mention it in your consultation and we will draft a customized proposal for you.
          </p>
        </Container>
      </section>

      <CTASection />

      <ContactModal open={open} onClose={() => setOpen(false)} packageName={selectedPackage} />
    </>
  );
}
