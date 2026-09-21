import { MetricCard } from "@/components/cms/MetricCard";
import { CmsSidebar } from "@/components/cms/dashboard/CmsSidebar";
import { DashboardHeader } from "@/components/cms/dashboard/DashboardHeader";
import { QuickActions } from "@/components/cms/dashboard/QuickActions";
import { RecentMessages } from "@/components/cms/dashboard/RecentMessages";
import { dashboardMetrics } from "@/lib/data/cms-dashboard-data";

export default function CmsDashboardPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-background text-text-primary">
      <div className="grid min-h-screen min-w-330 grid-cols-[224px_minmax(1096px,1fr)] bg-[radial-gradient(circle_at_66%_20%,rgba(139,92,246,0.08),transparent_30%)]">
        <CmsSidebar />
        <main>
          <DashboardHeader />
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
        </main>
      </div>
    </div>
  );
}
