"use client";

import type { Project } from "@/lib/data/projects-data";
import { ProjectBreadcrumb } from "./ProjectBreadcrumb";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectInfoCards } from "./ProjectInfoCards";
import { ProjectImageCarousel } from "./ProjectImageCarousel";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectLearnings } from "./ProjectLearnings";
import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

function AnimatedWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-2000 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${className}`
      }`}
    >
      {children}
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <AnimatedWrapper className="-translate-y-10">
        <ProjectBreadcrumb title={project.title} />
      </AnimatedWrapper>

      <AnimatedWrapper className="-translate-x-12">
        <ProjectHeader project={project} />
      </AnimatedWrapper>

      <AnimatedWrapper className="translate-x-12">
        <ProjectInfoCards project={project} />
      </AnimatedWrapper>

      <AnimatedWrapper className="translate-y-12">
        <ProjectImageCarousel images={project.image} title={project.title} />
      </AnimatedWrapper>

      <AnimatedWrapper className="-translate-x-12">
        <ProjectOverview overview={project.overview} />
      </AnimatedWrapper>

      <AnimatedWrapper className="translate-x-12">
        <ProjectTechStack techStack={project.techStack} />
      </AnimatedWrapper>

      <AnimatedWrapper className="translate-y-12">
        <ProjectLearnings learnings={project.learnings} />
      </AnimatedWrapper>
    </div>
  );
}
