import React from "react";
import { Trash2 } from "lucide-react";

export interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

export function DeleteButton({
  iconSize = 14,
  className = "",
  title = "Delete",
  "aria-label": ariaLabel = "Delete",
  ...props
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20 hover:border-red-500 active:scale-95 ${className}`}
      {...props}
    >
      <Trash2 size={iconSize} />
    </button>
  );
}

