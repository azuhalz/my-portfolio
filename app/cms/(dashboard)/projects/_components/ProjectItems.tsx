"use client";

import Image from "next/image";
import { GripVertical, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { DeleteButton } from "@/components/ui/DeleteButton";
import type { Project } from "@/lib/data/projects-data";

interface ProjectItemsProps {
  projects: Project[];
  onReorder?: (projects: Project[]) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onAdd?: () => void;
}

export function ProjectItems({
  projects,
  onEdit,
  onDelete,
  onAdd,
}: ProjectItemsProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Project Items</h2>
        <Button
          variant="primary"
          onClick={onAdd}
          className="px-4! py-2! text-sm rounded-lg! shadow-none hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition-all hover:border-primary/40 hover:bg-card/80"
          >
            {/* Drag Handle & Nomor Urut */}
            <div className="flex items-center gap-2 text-text-secondary select-none">
              <button
                type="button"
                className="cursor-grab active:cursor-grabbing text-text-secondary hover:text-white transition-colors p-0.5"
                title="Drag to reorder"
                aria-label="Drag to reorder"
              >
                <GripVertical size={16} />
              </button>
              <span className="text-sm font-medium w-4 text-center">
                {index + 1}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-border">
              {project.image?.[0] ? (
                <Image
                  src={project.image[0]}
                  alt={project.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-card text-xs text-text-secondary">
                  No img
                </div>
              )}
            </div>

            {/* Konten Teks */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {project.title}
              </h3>
              <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {project.overview}
              </p>

              {/* Tech Badges */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    variant="default"
                    className="text-[10px] px-2 py-0.5"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] text-text-secondary self-center">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <EditButton
                onClick={() => onEdit?.(project)}
                title="Edit Project"
                aria-label="Edit project"
              />
              <DeleteButton
                onClick={() => onDelete?.(project)}
                title="Delete Project"
                aria-label="Delete project"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
