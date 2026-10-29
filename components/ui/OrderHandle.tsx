import { GripVertical } from "lucide-react";

type OrderHandleProps = {
  order: number;
  className?: string;
};

export function OrderHandle({ order, className = "" }: OrderHandleProps) {
  return (
    <div
      className={`flex items-center gap-2 text-text-secondary select-none ${className}`}
    >
      <button
        type="button"
        data-drag-handle
        className="cursor-grab active:cursor-grabbing p-0.5 text-text-secondary hover:text-white transition-colors"
        title="Drag to reorder (or use the ↑ ↓ keys)"
        aria-label="Reorder item. Drag it, or use the up and down arrow keys."
      >
        <GripVertical size={16} />
      </button>
      <span className="w-4 text-center text-sm font-medium">{order}</span>
    </div>
  );
}
