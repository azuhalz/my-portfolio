import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/projects-data";

type ProjectHeaderProps = {
  project: Project;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <>
      {/* Judul Project */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        {project.title}
      </h1>

      {/* Tombol-tombol: Live Demo, GitHub, Back */}
      <div className="flex flex-wrap gap-4 mb-10">
        {project.liveDemoLink && (
          <Button href={project.liveDemoLink} variant="primary" target="_blank">
            Live Demo <ExternalLink size={18} />
          </Button>
        )}

        {project.githubLink && (
          <Button href={project.githubLink} variant="outline" target="_blank">
            GitHub <FaGithub size={18} />
          </Button>
        )}

        <Button href="/projects" variant="outline">
          <ArrowLeft size={18} /> Back to Projects
        </Button>
      </div>
    </>
  );
}
