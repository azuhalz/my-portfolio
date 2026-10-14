import { Plus } from "lucide-react";
import { TextAreaField } from "@/components/form/TextAreaField";
import { DeleteButton } from "@/components/ui/DeleteButton";

export type BulletListFieldProps = {
  label: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  itemLabel?: string; // label aksesibilitas tiap baris, contoh: "Point"
  placeholder?: string;
  addLabel?: string;
  rows?: number;
};

/**
 * Daftar poin berbullet yang bisa ditambah/dihapus.
 * Dipakai untuk Description (Experience) dan What I Learned (Project).
 */
export function BulletListField({
  label,
  items,
  onChange,
  onAdd,
  onRemove,
  itemLabel = "Point",
  placeholder = "",
  addLabel = "Add Another Point",
  rows = 2,
}: BulletListFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-secondary">{label}</span>

      <ul className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-text-primary"
            />
            <TextAreaField
              className="min-w-0 flex-1"
              label={`${itemLabel} ${index + 1}`}
              hideLabel
              value={item}
              onChange={(value) => onChange(index, value)}
              placeholder={placeholder}
              rows={rows}
            />
            <DeleteButton
              onClick={() => onRemove(index)}
              title={`Remove ${itemLabel}`}
              aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAdd}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
      >
        <Plus size={16} />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
