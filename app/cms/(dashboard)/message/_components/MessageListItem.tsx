import { Avatar } from "@/components/ui/Avatar";
import type { ContactMessage } from "@/lib/data/message-data";
import {
  formatMessageDate,
  formatMessageTime,
  getMessagePreview,
} from "@/lib/utils/message";

type MessageListItemProps = {
  message: ContactMessage;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function MessageListItem({
  message,
  isSelected,
  onSelect,
}: MessageListItemProps) {
  const { id, name, email, receivedAt, isRead } = message;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-current={isSelected ? "true" : undefined}
      className={`grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
        isSelected
          ? "border-primary/60 bg-primary/10"
          : "border-transparent hover:bg-card/60"
      }`}
    >
      <Avatar name={name} size="lg" />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-text-primary">
          {name}
        </p>
        <p className="truncate text-xs text-text-secondary">{email}</p>
        <p className="truncate text-xs text-text-secondary">
          {getMessagePreview(message)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right text-xs text-text-secondary">
          <p>{formatMessageDate(receivedAt)}</p>
          <p className="mt-1">{formatMessageTime(receivedAt)}</p>
        </div>
        <span
          role="img"
          aria-label={isRead ? "Read" : "Unread"}
          className={`size-2 rounded-full ${
            isRead ? "bg-text-secondary/40" : "bg-primary"
          }`}
        />
      </div>
    </button>
  );
}
