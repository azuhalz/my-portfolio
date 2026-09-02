import Image from "next/image";
import { ExternalLink, Heart, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/projects-data";
import { Card } from "../ui/Card";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex flex-col gap-5 border border-primary/35 p-4 shadow-[0_0_24px_rgba(139,92,246,0.1)] transition-colors hover:border-primary/70 md:flex-row">
      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-border md:w-96">
        <Image
          src={project.image}
          alt={`Preview ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col pr-16">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold text-white">
              {project.title}
            </h2>
            <Badge>{project.type}</Badge>
          </div>
          <p className="mt-3 text-md leading-6 text-text-secondary">
            {project.overview}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" className="text-primary">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {project.liveDemoLink ? (
            <Button
              href={project.liveDemoLink}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="px-3! py-2! text-sm"
            >
              Live Demo <ExternalLink size={16} />
            </Button>
          ) : (
            <Button variant="disabled" className="text-sm">
              Live Demo unavailable
            </Button>
          )}

          {project.githubLink ? (
            <Button
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="px-3! py-2! text-sm"
            >
              GitHub <FaGithub size={16} />
            </Button>
          ) : (
            <Button variant="disabled" className="text-sm">
              GitHub unavailable
            </Button>
          )}

          <Button
            variant="primary"
            className="text-sm"
            href={`/projects/${project.slug}`}
          >
            Details <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <span
        aria-label={`Add ${project.title} to favourites`}
        className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-primary/40 text-text-secondary"
      >
        <Heart size={18} />
      </span>
    </Card>
  );
}
