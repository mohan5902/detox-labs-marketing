import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GridBackdrop from "@/components/ui/GridBackdrop";
import ProjectCard from "@/components/projects/ProjectCard";
import CTASection from "@/components/home/CTASection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of custom websites and digital platforms built by Detox Labs across food, fitness, real estate, portfolio, and service businesses.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20">
        <GridBackdrop />
        <Container>
          <SectionHeading
            eyebrow="Our Work"
            title="Projects built to perform, not just look good."
            description="A selection of websites and platforms delivered for real businesses across food, services, real estate, fitness, and portfolio brands."
          />
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
