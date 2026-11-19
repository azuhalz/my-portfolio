"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/data/cms-navigation-data";

export function CmsSidebar() {
  const pathname = usePathname();
  const activeIndex = dashboardNavItems.findIndex(
    ({ href }) => pathname === href,
  );

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-border bg-background/95 px-4 py-6">
      <p className="px-2 text-3xl font-bold tracking-tight text-text-primary">
        AZZ<span className="text-primary">.</span>
      </p>

      <nav className="relative mt-9 space-y-2" aria-label="CMS navigation">
        {/* Animated sliding highlight background */}
        {activeIndex !== -1 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 h-11 rounded-lg border border-primary/60 bg-primary/20 shadow-[0_0_22px_rgba(139,92,246,0.18)] transition-all duration-300 ease-out"
            style={{
              top: `calc(${activeIndex} * (2.75rem + 0.5rem))`,
            }}
          />
        )}

        {dashboardNavItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`relative z-10 flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-200 ${
                isActive
                  ? "text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className={`transition-colors duration-200 ${
                  isActive ? "text-primary" : ""
                }`}
              />
              <span
                className={
                  label === "Organizational Experience"
                    ? "max-w-32 leading-4"
                    : ""
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <p className="mt-auto px-6 text-xs text-text-secondary">
        Zhafran CMS v1.0.0
      </p>
    </aside>
  );
}
