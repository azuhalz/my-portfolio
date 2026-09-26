import { MetricCard } from "@/components/cms/MetricCard";
import { QuickActions } from "@/app/cms/(dashboard)/dashboard/_components/QuickActions";
import { RecentMessages } from "@/app/cms/(dashboard)/dashboard/_components/RecentMessages";
import { dashboardMetrics } from "@/lib/data/cms-dashboard-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Dashboard",
};

export default function CmsDashboardPage() {
  return (
    <div className="space-y-4 px-6 py-5">
      <section
        className="grid grid-cols-4 gap-4"
        aria-label="Portfolio summary"
      >
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="grid grid-cols-[0.76fr_1.34fr] gap-4">
        <RecentMessages />
        <QuickActions />
      </section>
    </div>
  );
}
