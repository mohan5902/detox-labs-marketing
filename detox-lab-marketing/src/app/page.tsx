import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import N8NFeatured from "@/components/home/N8NFeatured";
import N8NAgent from "@/components/home/N8NAgent";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <N8NFeatured />
      <N8NAgent />
      <About />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
