import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
import { ProjectItem } from "./ProjectItem";
import type { Project } from "@/lib/data/projects-data";

type ProjectItemsProps = {
  projects: Project[];
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
};

export function ProjectItems({
  projects,
  onAdd,
  onReorder,
  onEdit,
  onDelete,
}: ProjectItemsProps) {
  return (
    <ItemListCard
      items={projects}
      addLabel="Add Project"
      onAdd={onAdd}
      onReorder={onReorder}
      getKey={(project) => project.slug}
      renderItem={(project, order) => (
        <ProjectItem
          project={project}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
