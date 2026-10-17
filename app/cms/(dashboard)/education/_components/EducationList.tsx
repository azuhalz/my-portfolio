import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { EducationItem } from "./EducationItem";
import type { Education } from "@/lib/data/education-data";

type EducationListProps = {
  educations: Education[];
  onAdd?: () => void;
  onEdit?: (education: Education) => void;
  onDelete?: (education: Education) => void;
};

export function EducationList({
  educations,
  onAdd,
  onEdit,
  onDelete,
}: EducationListProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel="Add Education" onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {educations.map((education, index) => (
          <EducationItem
            key={`${education.institution}-${education.startYear}`}
            education={education}
            order={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
