import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatMessageShortDate } from "@/lib/utils/message";

interface DashboardMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  received_at: string;
  is_read: boolean;
  is_archived: boolean;
}

interface RecentMessagesProps {
  messages: DashboardMessage[];
}

const RECENT_MESSAGES_LIMIT = 4;

export function RecentMessages({ messages }: RecentMessagesProps) {
  const recentMessages = messages
    .filter((message) => !message.is_archived)
    .sort(
      (a, b) =>
        new Date(b.received_at).getTime() - new Date(a.received_at).getTime(),
    )
    .slice(0, RECENT_MESSAGES_LIMIT);

  return (
    <section className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/45">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="flex items-center gap-3 text-base font-medium">
            <span className="rounded-lg bg-primary/15 p-2 text-primary">
              <Mail size={18} />
            </span>
            Recent Messages
          </h2>
        </div>

        <div className="flex-1 px-4">
          {recentMessages.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-secondary">
              No messages yet.
            </p>
          ) : (
            recentMessages.map((message) => (
              <article
                key={message.id}
                className="grid grid-cols-[36px_102px_1fr_42px_8px] items-center gap-3 border-b border-border/70 py-3 last:border-0"
              >
                <Avatar name={message.name} />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{message.name}</p>
                  <p className="truncate text-[11px] text-text-secondary">
                    {message.email}
                  </p>
                </div>

                <p className="line-clamp-2 text-xs leading-4 text-text-secondary">
                  {message.message.replace(/\s+/g, " ").trim()}
                </p>

                <span className="text-right text-[11px] text-text-secondary">
                  {formatMessageShortDate(message.received_at)}
                </span>

                {!message.is_read && (
                  <span
                    className="size-2 rounded-full bg-primary"
                    aria-label="Unread message"
                  />
                )}
              </article>
            ))
          )}
        </div>
      </div>

      <Link
        href="/cms/message"
        className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-sm text-primary"
      >
        View All Messages <ArrowRight size={17} />
      </Link>
    </section>
  );
}
