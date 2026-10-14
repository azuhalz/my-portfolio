import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ItemActions } from "@/components/ui/ItemActions";
import { OrderHandle } from "@/components/ui/OrderHandle";
import type { Certification } from "@/lib/data/certifications-data";
import { formatCertificationDates } from "@/lib/utils/format-certification";

type CertificationItemProps = {
  certification: Certification;
  order: number;
  onEdit?: (certification: Certification) => void;
  onDelete?: (certification: Certification) => void;
};

export function CertificationItem({
  certification,
  order,
  onEdit,
  onDelete,
}: CertificationItemProps) {
  const { name, issuer, credentialUrl } = certification;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition-all hover:border-primary/40 hover:bg-card/80">
      <OrderHandle order={order} />

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
        <p className="mt-0.5 text-xs text-text-secondary">{issuer}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary">
          <Calendar size={12} />
          <span>{formatCertificationDates(certification)}</span>
        </p>

        <Button
          variant="primary"
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 w-full px-3! py-1.5! text-xs rounded-lg! hover:translate-y-0!"
        >
          <span>Show credential</span>
          <ExternalLink size={12} />
        </Button>
      </div>

      <ItemActions
        itemName="Certification"
        onEdit={() => onEdit?.(certification)}
        onDelete={() => onDelete?.(certification)}
      />
    </div>
  );
}
