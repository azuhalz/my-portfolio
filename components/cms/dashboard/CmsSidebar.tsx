import { dashboardNavItems } from "@/lib/data/cms-dashboard-data";

export function CmsSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-border bg-background/95 px-4 py-6">
      <p className="px-2 text-3xl font-bold tracking-tight text-text-primary">
        AZZ<span className="text-primary">.</span>
      </p>

      <nav className="mt-9 space-y-2" aria-label="CMS navigation">
        {dashboardNavItems.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              active
                ? "border border-primary/60 bg-primary/20 text-text-primary shadow-[0_0_22px_rgba(139,92,246,0.18)]"
                : "text-text-secondary"
            }`}
          >
            <Icon size={19} strokeWidth={1.8} className={active ? "text-primary" : ""} />
            <span className={label === "Organizational Experience" ? "max-w-32 leading-4" : ""}>
              {label}
            </span>
          </div>
        ))}
      </nav>

      <p className="mt-auto px-6 text-xs text-text-secondary">AZZ. CMS v2.0.0</p>
    </aside>
  );
}
