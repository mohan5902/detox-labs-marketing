import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import GridBackdrop from "@/components/ui/GridBackdrop";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom N8N AI workflows, website development, mobile app development, and web application development services from Detox Labs.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20">
        <GridBackdrop />
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything your business needs to automate and grow."
            description="From N8N AI workflow automation to responsive mobile apps and web platforms. We engineering systems designed for measurable business scaling."
          />
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUs />
      <CTASection />
    </>
  );
}
