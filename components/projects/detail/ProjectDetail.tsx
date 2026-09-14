import type { Project } from "@/lib/projects-data";
import { ProjectBreadcrumb } from "./ProjectBreadcrumb";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectInfoCards } from "./ProjectInfoCards";
import { ProjectImageCarousel } from "./ProjectImageCarousel";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectLearnings } from "./ProjectLearnings";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <ProjectBreadcrumb title={project.title} />
      <ProjectHeader project={project} />
      <ProjectInfoCards project={project} />
      <ProjectImageCarousel images={project.image} title={project.title} />
      <ProjectOverview overview={project.overview} />
      <ProjectTechStack techStack={project.techStack} />
      <ProjectLearnings learnings={project.learnings} />
    </div>
  );
}
