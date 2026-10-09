import type { LucideIcon } from "lucide-react";

interface DashboardMetricCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
  trendLabel?: string;
  sparkline?: string;
  detail?: string;
}

export function DashboardMetricCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  sparkline,
  detail,
}: DashboardMetricCardProps) {
  return (
    <article className="relative min-h-49 overflow-hidden rounded-xl border border-border bg-card/65 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-[0_0_24px_rgba(139,92,246,0.12)]">
            <Icon size={25} strokeWidth={1.8} />
          </span>
        )}

        <div className="flex-1">
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="mt-1 text-2xl font-medium tracking-tight text-text-primary">
            {value}
          </p>

          {(sparkline || trend) && (
            <div className="mt-3 flex flex-col gap-1.5">
              {sparkline && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 112 54"
                  className="h-10 w-28 text-primary"
                >
                  <path
                    d={sparkline}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {trend && (
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-success">↑ {trend}</span>
                  {trendLabel && ` ${trendLabel}`}
                </p>
              )}
            </div>
          )}

          {detail && <p className="mt-2 text-xs text-primary">{detail}</p>}
        </div>
      </div>
    </article>
  );
}
