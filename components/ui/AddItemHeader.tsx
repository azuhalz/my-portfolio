import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AddItemHeaderProps = {
  addLabel: string;
  onAdd?: () => void;
};

export function AddItemHeader({ addLabel, onAdd }: AddItemHeaderProps) {
  return (
    <div className="flex justify-end gap-4 items-center">
      <Button
        variant="primary"
        onClick={onAdd}
        className="px-4! py-2! text-sm rounded-lg! shadow-none hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
      >
        <Plus size={16} />
        <span>{addLabel}</span>
      </Button>
    </div>
  );
}
