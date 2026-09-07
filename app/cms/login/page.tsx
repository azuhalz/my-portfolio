"use client";

import { ChartLine, Shield, Zap } from "lucide-react";
import { DashboardPreview } from "@/components/cms/DashboardPreview";
import { LoginSidebar } from "@/components/cms/LoginSidebar";
import { LoginCard } from "@/components/cms/LoginCard";
import { MobileHeader } from "@/components/cms/MobileHeader";

const iconMap = {
  Zap,
  Shield,
  ChartLine,
};

function getIcon(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap];
}

export default function CmsLoginPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#030615] text-white [background-image:radial-gradient(circle_at_50%_25%,rgba(88,28,135,0.16),transparent_26%),radial-gradient(circle_at_88%_80%,rgba(76,29,149,0.1),transparent_22%)]">
      <div className="mx-auto grid min-h-full max-w-[1540px] grid-cols-1 gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(220px,0.8fr)_minmax(430px,1.15fr)_minmax(310px,0.9fr)] lg:items-center lg:gap-12 lg:px-11 xl:gap-16">
        <LoginSidebar getIcon={getIcon} />

        <section className="mx-auto flex w-full max-w-[490px] flex-col justify-center lg:max-w-none">
          <MobileHeader />
          <LoginCard />
        </section>

        <aside className="hidden lg:block">
          <DashboardPreview />
        </aside>
      </div>
    </div>
  );
}
