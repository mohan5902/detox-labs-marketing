import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPreview() {
  return (
    <section id="services" className="relative py-24 border-t border-white/5">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          title="Four disciplines. One growth engine."
          description="Workflow automation, websites, mobile apps, and custom web tools — engineered together so your business grows faster."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-circuit-300 hover:text-circuit-200"
          >
            Explore all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
