import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type FormActionsProps = {
  submitLabel: string;
  submitIcon?: ReactNode;
  cancelLabel?: string;
  onCancel: () => void;
};

export function FormActions({
  submitLabel,
  submitIcon,
  cancelLabel = "Cancel",
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="px-5! py-2.5! text-sm rounded-lg! border-border! hover:bg-card!"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        variant="primary"
        className="px-5! py-2.5! text-sm rounded-lg!"
      >
        <span>{submitLabel}</span>
        {submitIcon}
      </Button>
    </div>
  );
}
