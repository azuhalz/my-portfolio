import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
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
    <ItemListCard
      items={experiences}
      addLabel="Add Experience"
      onAdd={onAdd}
      getKey={(experience) => `${experience.company}-${experience.period}`}
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
