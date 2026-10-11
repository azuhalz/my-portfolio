"use client";

import { ChartLine, Shield, Zap } from "lucide-react";
import { DashboardPreview } from "./_components/DashboardPreview";
import { LoginSidebar } from "./_components/LoginSidebar";
import { LoginCard } from "./_components/LoginCard";
import type { LucideIcon } from "lucide-react";
import type { LoginBenefitIconName } from "./_components/BenefitsList";

const iconMap: Record<LoginBenefitIconName, LucideIcon> = {
  Zap,
  Shield,
  ChartLine,
};

function getIcon(iconName: LoginBenefitIconName) {
  return iconMap[iconName];
}

export default function CmsLoginPage() {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background text-text-primary"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 25%, rgba(139,92,246,0.08), transparent 26%), radial-gradient(circle at 88% 80%, rgba(139,92,246,0.05), transparent 22%)",
      }}
    >
      <div className="mx-auto grid min-h-full max-w-[1540px] grid-cols-[minmax(220px,0.8fr)_minmax(430px,1.15fr)_minmax(310px,0.9fr)] items-center gap-16 px-11 py-8">
        <LoginSidebar getIcon={getIcon} />

        <section className="mx-auto flex w-full flex-col justify-center">
          <LoginCard />
        </section>

        <aside className="block">
          <DashboardPreview />
        </aside>
      </div>
    </div>
  );
}
