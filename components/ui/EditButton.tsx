import React from "react";
import { Pencil } from "lucide-react";

export interface EditButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

export function EditButton({
  iconSize = 14,
  className = "",
  title = "Edit",
  "aria-label": ariaLabel = "Edit",
  ...props
}: EditButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20 hover:border-primary active:scale-95 ${className}`}
      {...props}
    >
      <Pencil size={iconSize} />
    </button>
  );
}

