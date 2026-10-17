import { ItemActions } from "@/components/ui/ItemActions";
import { OrderHandle } from "@/components/ui/OrderHandle";
import { PointList } from "@/components/ui/PointList";
import type { Experience } from "@/lib/data/experience-data";
import { formatExperiencePeriod } from "@/lib/utils/format-experience-period";

type ExperienceItemProps = {
  experience: Experience;
  order: number;
  onEdit?: (experience: Experience) => void;
  onDelete?: (experience: Experience) => void;
};

export function ExperienceItem({
  experience,
  order,
  onEdit,
  onDelete,
}: ExperienceItemProps) {
  const { title, company, startDate, endDate, points } = experience;

  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-primary/40 hover:bg-card/80">
      <OrderHandle order={order} className="self-start" />

      {/* Penanda Timeline: titik + garis vertikal */}
      <div className="flex flex-col items-center pt-1.5">
        <span className="size-3 shrink-0 rounded-full bg-text-primary ring-4 ring-primary/40" />
        <span className="mt-2 w-px flex-1 bg-border" />
      </div>

      {/* Konten */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-text-primary">
            {title}, {company}
          </h3>
          <span className="shrink-0 text-xs text-text-secondary">
            {formatExperiencePeriod(startDate, endDate)}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <PointList points={points} />

          <ItemActions
            itemName="Experience"
            onEdit={() => onEdit?.(experience)}
            onDelete={() => onDelete?.(experience)}
          />
        </div>
      </div>
    </div>
  );
}
