import { CmsSidebar } from "@/app/cms/(dashboard)/_components/CmsSidebar";
import { DashboardHeader } from "@/app/cms/(dashboard)/_components/CmsHeader";

export default function CmsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-background text-text-primary">
      <div className="grid min-h-screen min-w-330 grid-cols-[224px_minmax(1096px,1fr)] bg-[radial-gradient(circle_at_66%_20%,rgba(139,92,246,0.08),transparent_30%)]">
        <CmsSidebar />
        <div className="min-w-0">
          <DashboardHeader />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
