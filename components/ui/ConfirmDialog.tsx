"use client";

import { useId } from "react";
import {
  CircleCheck,
  CircleHelp,
  Trash2,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconBadge, type IconBadgeTone } from "@/components/ui/IconBadge";
import { Modal } from "@/components/ui/Modal";

export type DialogTone = IconBadgeTone;

const TONE_ICONS: Record<DialogTone, LucideIcon> = {
  primary: CircleHelp,
  danger: Trash2,
  success: CircleCheck,
  warning: TriangleAlert,
};

const BUTTON_STYLE = "px-5! py-2.5! text-sm rounded-lg! hover:translate-y-0!";

type ConfirmDialogProps = {
  isOpen: boolean;
  tone?: DialogTone;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string; // tanpa cancelLabel = dialog pemberitahuan (satu tombol)
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  isOpen,
  tone = "primary",
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const Icon = TONE_ICONS[tone];

  // Aksi berbahaya: fokus awal di Cancel agar tidak terhapus karena tekan Enter
  const focusCancel = tone === "danger" && Boolean(cancelLabel);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      role={cancelLabel ? "alertdialog" : "dialog"}
      labelledBy={titleId}
      describedBy={descriptionId}
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-start gap-4">
          <IconBadge tone={tone}>
            <Icon size={22} />
          </IconBadge>

          <div className="min-w-0 flex-1 pt-0.5">
            <h2
              id={titleId}
              className="text-lg font-semibold text-text-primary"
            >
              {title}
            </h2>
            <p
              id={descriptionId}
              className="mt-1.5 text-sm leading-relaxed text-text-secondary"
            >
              {description}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {cancelLabel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              autoFocus={focusCancel}
              className={`${BUTTON_STYLE} border-border! hover:bg-card!`}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            type="button"
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            autoFocus={!focusCancel}
            className={BUTTON_STYLE}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
