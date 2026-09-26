import { LayoutGrid, User, Calendar } from "lucide-react";
import { InfoCard } from "@/components/ui/InfoCard";
import type { Project } from "@/lib/data/projects-data";

type ProjectInfoCardsProps = {
  project: Project;
};

export function ProjectInfoCards({ project }: ProjectInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <InfoCard
        icon={<LayoutGrid size={24} />}
        title="Project Type"
        value={project.type}
      />

      <InfoCard icon={<User size={24} />} title="Role" value={project.role} />

      <InfoCard
        icon={<Calendar size={24} />}
        title="Timeline"
        value={project.timeline}
      />
    </div>
  );
}
