"use client";

import Image from "next/image";
import { Bell, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/data/cms-navigation-data";

export function DashboardHeader() {
  const pathname = usePathname();
  const currentPage = dashboardNavItems.find((item) => item.href === pathname);
  const title = currentPage?.label ?? "Dashboard";
  const description = currentPage?.description;

  return (
    <header className="sticky top-0 z-10 flex h-21 items-center justify-between border-b border-border bg-background/95 px-8 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Welcome back, Zhafran! <span aria-hidden="true">👋</span>{" "}
          {description}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Button
          href="/"
          variant="outline"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg text-sm px-4! py-2!"
        >
          View Website
          <ExternalLink size={16} />
        </Button>
        <span className="h-8 w-px bg-border" />
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-text-secondary transition hover:text-primary"
        >
          <Bell size={22} />
          <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
            3
          </span>
        </button>
        <Image
          src="/profile4.png"
          alt="Admin User"
          width={46}
          height={46}
          className="size-11 rounded-full border border-primary/60 object-cover"
        />
        <div className="leading-5">
          <p className="text-sm font-medium">Zhafran</p>
          <p className="text-xs text-text-secondary">
            ahmadzuhalzhafran@gmail.com
          </p>
        </div>
        <button
          type="button"
          aria-label="Open account menu"
          className="rounded-lg p-2 text-text-secondary transition hover:text-primary"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}
