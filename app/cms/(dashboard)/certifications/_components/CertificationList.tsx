import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
import { CertificationItem } from "./CertificationItem";
import type { Certification } from "@/lib/data/certifications-data";

type CertificationListProps = {
  certifications: Certification[];
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void;
  onEdit?: (certification: Certification) => void;
  onDelete?: (certification: Certification) => void;
};

export function CertificationList({
  certifications,
  onAdd,
  onReorder,
  onEdit,
  onDelete,
}: CertificationListProps) {
  return (
    <ItemListCard
      items={certifications}
      addLabel="Add Certification"
      onAdd={onAdd}
      onReorder={onReorder}
      getKey={(certification) => certification.credentialUrl}
      renderItem={(certification, order) => (
        <CertificationItem
          certification={certification}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
