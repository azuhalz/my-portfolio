import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { ProjectItem } from "./ProjectItem";
import type { Project } from "@/lib/data/projects-data";

type ProjectItemsProps = {
  projects: Project[];
  onAdd?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
};

export function ProjectItems({
  projects,
  onAdd,
  onEdit,
  onDelete,
}: ProjectItemsProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel="Add Project" onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.slug}
            project={project}
            order={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
