import { EditButton } from "@/components/ui/EditButton";
import { DeleteButton } from "@/components/ui/DeleteButton";

type ItemActionsProps = {
  itemName: string; // contoh: "Project", "Experience"
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ItemActions({ itemName, onEdit, onDelete }: ItemActionsProps) {
  const lowerName = itemName.toLowerCase();

  return (
    <div className="flex shrink-0 flex-col gap-2">
      <EditButton
        onClick={onEdit}
        title={`Edit ${itemName}`}
        aria-label={`Edit ${lowerName}`}
      />
      <DeleteButton
        onClick={onDelete}
        title={`Delete ${itemName}`}
        aria-label={`Delete ${lowerName}`}
      />
    </div>
  );
}
