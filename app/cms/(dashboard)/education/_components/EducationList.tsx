import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
import { EducationItem } from "./EducationItem";
import type { Education } from "@/lib/data/education-data";

type EducationListProps = {
  educations: Education[];
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void;
  onEdit?: (education: Education) => void;
  onDelete?: (education: Education) => void;
};

export function EducationList({
  educations,
  onAdd,
  onReorder,
  onEdit,
  onDelete,
}: EducationListProps) {
  return (
    <ItemListCard
      items={educations}
      addLabel="Add Education"
      onAdd={onAdd}
      onReorder={onReorder}
      getKey={(education) => `${education.institution}-${education.startYear}`}
      renderItem={(education, order) => (
        <EducationItem
          education={education}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
