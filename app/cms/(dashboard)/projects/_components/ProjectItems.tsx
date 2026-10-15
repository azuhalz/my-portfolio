import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
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
    <ItemListCard
      items={projects}
      addLabel="Add Project"
      onAdd={onAdd}
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
