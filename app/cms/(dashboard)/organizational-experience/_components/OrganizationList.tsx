import { ItemListCard } from "@/app/cms/(dashboard)/_components/ItemListCard";
import { OrganizationItem } from "./OrganizationItem";
import type { Organization } from "@/lib/data/organizational-data";

type OrganizationListProps = {
  organizations: Organization[];
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void;
  onEdit?: (organization: Organization) => void;
  onDelete?: (organization: Organization) => void;
};

export function OrganizationList({
  organizations,
  onAdd,
  onReorder,
  onEdit,
  onDelete,
}: OrganizationListProps) {
  return (
    <ItemListCard
      items={organizations}
      addLabel="Add Organizational Experience"
      onAdd={onAdd}
      onReorder={onReorder}
      getKey={(organization) => `${organization.role}-${organization.period}`}
      renderItem={(organization, order) => (
        <OrganizationItem
          organization={organization}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
