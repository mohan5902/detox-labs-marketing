"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <GlassCard className="group flex h-full flex-col overflow-hidden hover:border-circuit-400/40 hover:shadow-glow transition-all duration-300">
        {/* Browser Mockup Header */}
        <div className="flex items-center bg-white/[0.04] border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="ml-4 flex-1 rounded bg-white/[0.05] py-0.5 px-3 text-[10px] font-mono text-ink-700 truncate text-center select-none">
            {project.url ? project.url.replace("https://", "") : "detoxlabs.me"}
          </div>
        </div>

        {/* Browser Mockup Body / Screenshot */}
        <div className={cn("relative h-48 w-full overflow-hidden bg-gradient-to-br", project.accent)}>
          <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Project Info */}
        <div className="flex flex-1 flex-col p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-circuit-300 font-semibold">
            {project.category}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink-100 group-hover:text-circuit-300 transition-colors">
            {project.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-ink-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-white/5 pt-4">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-circuit-300 transition-colors hover:text-circuit-200"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700">
                Private Work
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
