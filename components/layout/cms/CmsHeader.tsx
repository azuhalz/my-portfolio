"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NotificationMenu } from "./NotificationMenu";
import { ProfileMenu } from "./ProfileMenu";
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
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
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
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </header>
  );
}
