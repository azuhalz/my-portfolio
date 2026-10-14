import { Archive, Mail, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ACTION_BUTTON_STYLE =
  "flex-1 px-4! py-2.5! text-sm rounded-lg! border-border! hover:bg-card! hover:translate-y-0!";

const DANGER_BUTTON_STYLE =
  "border-red-500/40! bg-red-500/10! text-red-400! hover:bg-red-500/20! hover:border-red-500!";

type MessageActionsProps = {
  isRead: boolean;
  onToggleRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function MessageActions({
  isRead,
  onToggleRead,
  onArchive,
  onDelete,
}: MessageActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onToggleRead}
        className={ACTION_BUTTON_STYLE}
      >
        {isRead ? <Mail size={16} /> : <MailOpen size={16} />}
        <span>{isRead ? "Mark as Unread" : "Mark as Read"}</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onArchive}
        className={ACTION_BUTTON_STYLE}
      >
        <Archive size={16} />
        <span>Archive</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onDelete}
        className={`${ACTION_BUTTON_STYLE} ${DANGER_BUTTON_STYLE}`}
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </Button>
    </div>
  );
}
