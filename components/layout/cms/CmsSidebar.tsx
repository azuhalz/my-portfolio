"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/data/cms-navigation-data";

export function CmsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-border bg-background/95 px-4 py-6">
      <p className="px-2 text-3xl font-bold tracking-tight text-text-primary">
        AZZ<span className="text-primary">.</span>
      </p>

      <nav className="mt-9 space-y-2" aria-label="CMS navigation">
        {dashboardNavItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                isActive
                  ? "border border-primary/60 bg-primary/20 text-text-primary shadow-[0_0_22px_rgba(139,92,246,0.18)]"
                  : "text-text-secondary"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className={isActive ? "text-primary" : ""}
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
