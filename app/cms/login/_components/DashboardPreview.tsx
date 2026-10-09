import { LoginMetricPreview } from "@/app/cms/login/_components/LoginMetricPreview";

export function DashboardPreview() {
  return (
    <div
      className="relative mx-auto h-142.5 w-full max-w-125"
      aria-hidden="true"
    >
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full border border-primary/45 bg-primary/10 blur-[0.2px]" />
      <div className="absolute right-6 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-5 top-16 w-91.25 rotate-6 overflow-hidden rounded-2xl border border-primary/55 bg-background/85 shadow-[0_20px_60px_rgba(139,92,246,0.35)] backdrop-blur">
        <div className="flex h-10 items-center gap-1.5 border-b border-primary/15 px-4">
          <span className="size-2 rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-primary/60" />
          <span className="size-2 rounded-full bg-primary/60" />
        </div>
        <div className="flex min-h-77.5">
          <aside className="w-20 border-r border-primary/10 p-3">
            <div className="mb-4 rounded-md bg-primary/15 p-2 text-primary">
              ⌂
            </div>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="mb-4 flex items-center gap-1.5">
                <span className="size-2 rounded bg-primary/35" />
                <span className="h-1.5 w-7 rounded bg-primary/15" />
              </div>
            ))}
          </aside>
          <div className="flex-1 p-4">
            <p className="mb-5 text-sm font-semibold text-text-primary/60">
              Dashboard
            </p>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <LoginMetricPreview label="Projects" value="12" />
              <LoginMetricPreview label="Views" value="2,543" />
            </div>
            <div className="rounded-lg border border-primary/10 bg-card/80 p-3">
              <p className="text-[10px] text-text-secondary/45">
                Site Analytics
              </p>
              <svg
                viewBox="0 0 220 82"
                className="mt-2 h-24 w-full overflow-visible"
              >
                <path
                  d="M0 60 L20 55 L40 39 L62 62 L82 49 L102 67 L124 59 L146 33 L164 58 L184 53 L220 48"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
                <path
                  d="M0 60 L20 55 L40 39 L62 62 L82 49 L102 67 L124 59 L146 33 L164 58 L184 53 L220 48 V82 H0 Z"
                  fill="url(#chart-glow)"
                  opacity=".45"
                />
                <defs>
                  <linearGradient id="chart-glow" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#8b5cf6" stopOpacity=".4" />
                    <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-16 left-14 h-32 w-24 border border-primary/45 bg-primary/5 shadow-[16px_16px_0_-1px_rgba(139,92,246,0.12)]" />
      <div className="absolute bottom-8 right-9 flex h-24 w-32 rotate-10 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-card/80 text-sm text-primary shadow-lg">
        <span className="flex size-7 items-center justify-center rounded-full border border-primary text-primary">
          ✓
        </span>
        Published
      </div>
      <div className="absolute bottom-0 left-10 h-28 w-97.5 -rotate-2 border border-primary/25 [clip-path:polygon(0_30%,50%_0,100%_30%,100%_70%,50%_100%,0_70%)]" />
    </div>
  );
}
