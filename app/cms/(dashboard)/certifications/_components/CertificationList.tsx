import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { CertificationItem } from "./CertificationItem";
import type { Certification } from "@/lib/data/certifications-data";

type CertificationListProps = {
  certifications: Certification[];
  onAdd?: () => void;
  onEdit?: (certification: Certification) => void;
  onDelete?: (certification: Certification) => void;
};

export function CertificationList({
  certifications,
  onAdd,
  onEdit,
  onDelete,
}: CertificationListProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel="Add Certification" onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {certifications.map((certification, index) => (
          <CertificationItem
            key={certification.credentialUrl}
            certification={certification}
            order={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
