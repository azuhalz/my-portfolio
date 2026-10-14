import { ItemActions } from "@/components/ui/ItemActions";
import { OrderHandle } from "@/components/ui/OrderHandle";
import { PointList } from "@/components/ui/PointList";
import type { Organization } from "@/lib/data/organizational-data";

type OrganizationItemProps = {
  organization: Organization;
  order: number;
  onEdit?: (organization: Organization) => void;
  onDelete?: (organization: Organization) => void;
};

export function OrganizationItem({
  organization,
  order,
  onEdit,
  onDelete,
}: OrganizationItemProps) {
  const { role, period, points } = organization;

  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-primary/40 hover:bg-card/80">
      <OrderHandle order={order} className="self-start" />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-sm font-semibold text-text-primary">
          {role}, {organization.organization}
        </h3>

        <div className="flex items-start gap-4">
          <PointList points={points} />

          <ItemActions
            itemName="Organizational Experience"
            onEdit={() => onEdit?.(organization)}
            onDelete={() => onDelete?.(organization)}
          />
        </div>

        <p className="text-xs text-text-secondary">{period}</p>
      </div>
    </div>
  );
}
