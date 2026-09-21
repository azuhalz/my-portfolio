import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { quickActions } from "@/lib/data/cms-dashboard-data";

export function QuickActions() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card/45">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <span className="rounded-lg bg-primary/15 p-2 text-primary">
          <Zap size={18} />
        </span>
        <h2 className="text-base font-medium">Quick Actions</h2>
      </div>
      <Link href="#" className="grid grid-cols-4 gap-3 p-3">
        {quickActions.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="flex min-h-35 flex-col items-center justify-center rounded-lg border border-border bg-background/35 px-4 text-center transition hover:border-primary/50 hover:bg-primary/5"
          >
            <Icon size={31} strokeWidth={1.7} className="text-primary" />
            <p className="mt-3 text-sm font-medium">{title}</p>
            <p className="mt-1 text-xs leading-4 text-text-secondary">
              {description}
            </p>
          </div>
        ))}
      </Link>
      <div className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-sm text-primary">
        Manage All Content <ArrowRight size={17} />
      </div>
    </section>
  );
}
