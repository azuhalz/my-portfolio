import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { OrganizationItem } from "./OrganizationItem";
import type { Organization } from "@/lib/data/organizational-data";

type OrganizationListProps = {
  organizations: Organization[];
  onAdd?: () => void;
  onEdit?: (organization: Organization) => void;
  onDelete?: (organization: Organization) => void;
};

export function OrganizationList({
  organizations,
  onAdd,
  onEdit,
  onDelete,
}: OrganizationListProps) {
  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel="Add Organizational Experience" onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {organizations.map((organization, index) => (
          <OrganizationItem
            key={`${organization.role}-${organization.period}`}
            organization={organization}
            order={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
