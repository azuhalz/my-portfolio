import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
import { ExperienceItem } from "./ExperienceItem";
import type { Experience } from "@/lib/data/experience-data";

type ExperienceListProps = {
  experiences: Experience[];
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void;
  onEdit?: (experience: Experience) => void;
  onDelete?: (experience: Experience) => void;
};

export function ExperienceList({
  experiences,
  onAdd,
  onReorder,
  onEdit,
  onDelete,
}: ExperienceListProps) {
  return (
    <ItemListCard
      items={experiences}
      addLabel="Add Experience"
      onAdd={onAdd}
      onReorder={onReorder}
      getKey={(experience) => `${experience.company}-${experience.startDate}`}
      renderItem={(experience, order) => (
        <ExperienceItem
          experience={experience}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
