import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { ExperienceItem } from "./ExperienceItem";
import type { Experience } from "@/lib/data/experience-data";

type ExperienceListProps = {
  experiences: Experience[];
  onAdd?: () => void;
  onEdit?: (experience: Experience) => void;
  onDelete?: (experience: Experience) => void;
};

export function ExperienceList({
  experiences,
  onAdd,
  onEdit,
  onDelete,
}: ExperienceListProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel="Add Experience" onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={`${experience.company}-${experience.period}`}
            experience={experience}
            order={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
