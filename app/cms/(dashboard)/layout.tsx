import { CmsSidebar } from "@/components/layout/cms/CmsSidebar";
import { DashboardHeader } from "@/components/layout/cms/CmsHeader";

export default function CmsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-background text-text-primary">
      <div className="grid min-h-screen min-w-330 grid-cols-[224px_minmax(1096px,1fr)]">
        <CmsSidebar />
        <div className="min-w-0">
          <DashboardHeader />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
