import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import type { ContactMessage } from "@/lib/data/contact-data";

type NotificationPanelProps = {
  unreadCount: number;
  messages: ContactMessage[];
  onMarkAllAsRead: () => void;
  onNavigate: () => void;
};

export function NotificationPanel({
  unreadCount,
  messages,
  onMarkAllAsRead,
  onNavigate,
}: NotificationPanelProps) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-text-primary">Messages</h2>
        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className="cursor-pointer text-sm text-primary transition-colors hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-112 divide-y divide-border/70 overflow-y-auto">
        {unreadCount > 0 && (
          <div className="grid grid-cols-[auto_1fr] gap-3 px-5 py-3.5">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mail size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {unreadCount} unread{" "}
                {unreadCount === 1 ? "message" : "messages"}
              </p>
              <p className="mt-0.5 text-xs text-text-secondary">
                You have {unreadCount} unread{" "}
                {unreadCount === 1 ? "message" : "messages"} from your portfolio
                contacts.
              </p>
            </div>
          </div>
        )}

        {messages.length > 0 ? (
          messages.map((message) => (
            <NotificationItem
              key={message.id}
              message={message}
              onNavigate={onNavigate}
            />
          ))
        ) : (
          <p className="px-5 py-8 text-center text-sm text-text-secondary">
            No messages yet.
          </p>
        )}
      </div>

      <Link
        href="/cms/message"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 border-t border-border px-5 py-3.5 text-sm text-primary transition-colors hover:text-primary-hover"
      >
        View All Messages <ArrowRight size={16} />
      </Link>
    </div>
  );
}
