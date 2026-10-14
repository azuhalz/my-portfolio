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
        className="cursor-grab active:cursor-grabbing p-0.5 text-text-secondary hover:text-white transition-colors"
        title="Drag to reorder"
        aria-label="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      <span className="w-4 text-center text-sm font-medium">{order}</span>
    </div>
  );
}
