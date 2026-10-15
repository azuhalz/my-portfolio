import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import type { ContactMessage } from "@/lib/data/contact-data";
import { formatRelativeTime, getMessagePreview } from "@/lib/utils/message";

type NotificationItemProps = {
  message: ContactMessage;
  onNavigate: () => void;
};

export function NotificationItem({
  message,
  onNavigate,
}: NotificationItemProps) {
  return (
    <Link
      href="/cms/message"
      onClick={onNavigate}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 px-5 py-3.5 transition-colors hover:bg-primary/5"
    >
      <Avatar name={message.name} size="lg" />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-text-primary">
          {message.name}
        </p>
        <p className="text-xs font-medium text-text-primary">
          New contact message
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs text-text-secondary">
          {getMessagePreview(message)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 text-xs text-text-secondary">
        <span>{formatRelativeTime(message.receivedAt)}</span>
        {!message.isRead && (
          <span
            role="img"
            aria-label="Unread"
            className="size-2 rounded-full bg-primary"
          />
        )}
      </div>
    </Link>
  );
}
