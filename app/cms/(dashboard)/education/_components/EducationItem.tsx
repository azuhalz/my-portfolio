import { Badge } from "@/components/ui/Badge";
import { ItemActions } from "@/components/ui/ItemActions";
import { OrderHandle } from "@/components/ui/OrderHandle";
import type { Education } from "@/lib/data/education-data";
import {
  formatEducationDegree,
  formatEducationGpa,
} from "@/lib/utils/format-education";

type EducationItemProps = {
  education: Education;
  order: number;
  onEdit?: (education: Education) => void;
  onDelete?: (education: Education) => void;
};

export function EducationItem({
  education,
  order,
  onEdit,
  onDelete,
}: EducationItemProps) {
  const { institution, gpa } = education;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition-all hover:border-primary/40 hover:bg-card/80">
      <OrderHandle order={order} />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-text-primary">
          {institution}
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          {formatEducationDegree(education)}
        </p>
        {gpa && (
          <Badge className="mt-2 text-[10px] px-2 py-0.5">
            {formatEducationGpa(gpa)}
          </Badge>
        )}
      </div>

      <ItemActions
        itemName="Education"
        onEdit={() => onEdit?.(education)}
        onDelete={() => onDelete?.(education)}
      />
    </div>
  );
}
