import { LayoutGrid, User, Calendar } from "lucide-react";
import { CardAbout } from "@/components/ui/CardAbout";
import type { Project } from "@/lib/projects-data";

type ProjectInfoCardsProps = {
  project: Project;
};

export function ProjectInfoCards({ project }: ProjectInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <CardAbout
        icon={<LayoutGrid size={24} />}
        title="Project Type"
        value={project.type}
      />

      <CardAbout icon={<User size={24} />} title="Role" value={project.role} />

      <CardAbout
        icon={<Calendar size={24} />}
        title="Timeline"
        value={project.timeline}
      />
    </div>
  );
}
