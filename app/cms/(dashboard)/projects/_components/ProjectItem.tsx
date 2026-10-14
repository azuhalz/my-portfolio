import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ItemActions } from "@/components/ui/ItemActions";
import { OrderHandle } from "@/components/ui/OrderHandle";
import type { Project } from "@/lib/data/projects-data";

const MAX_VISIBLE_TECH = 3;

type ProjectItemProps = {
  project: Project;
  order: number;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
};

export function ProjectItem({
  project,
  order,
  onEdit,
  onDelete,
}: ProjectItemProps) {
  const { title, overview, techStack, image } = project;
  const hiddenTechCount = techStack.length - MAX_VISIBLE_TECH;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition-all hover:border-primary/40 hover:bg-card/80">
      <OrderHandle order={order} />

      {/* Thumbnail */}
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-border">
        {image[0] ? (
          <Image
            src={image[0]}
            alt={title}
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
          {title}
        </h3>
        <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {overview}
        </p>

        {/* Tech Badges */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {techStack.slice(0, MAX_VISIBLE_TECH).map((tech) => (
            <Badge key={tech} className="text-[10px] px-2 py-0.5">
              {tech}
            </Badge>
          ))}
          {hiddenTechCount > 0 && (
            <span className="text-[10px] text-text-secondary self-center">
              +{hiddenTechCount}
            </span>
          )}
        </div>
      </div>

      <ItemActions
        itemName="Project"
        onEdit={() => onEdit?.(project)}
        onDelete={() => onDelete?.(project)}
      />
    </div>
  );
}
