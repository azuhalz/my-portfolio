import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { recentMessages } from "@/lib/data/cms-dashboard-data";

export function RecentMessages() {
  return (
    <section className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/45">
      {/* Header & List Konten disatukan dalam satu div flex-1 */}
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
          {recentMessages.map((message) => (
            <article
              key={message.email}
              className="grid grid-cols-[36px_102px_1fr_42px_8px] items-center gap-3 border-b border-border/70 py-3 last:border-0"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                {message.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{message.name}</p>
                <p className="truncate text-[11px] text-text-secondary">
                  {message.email}
                </p>
              </div>
              <p className="line-clamp-2 text-xs leading-4 text-text-secondary">
                {message.excerpt}
              </p>
              <span className="text-right text-[11px] text-text-secondary">
                {message.receivedAt}
              </span>
              <span
                className="size-2 rounded-full bg-primary"
                aria-label="Unread message"
              />
            </article>
          ))}
        </div>
      </div>

      <Link
        href="/cms/contact"
        className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-sm text-primary"
      >
        View All Messages <ArrowRight size={17} />
      </Link>
    </section>
  );
}
