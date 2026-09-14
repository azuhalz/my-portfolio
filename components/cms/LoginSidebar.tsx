import { LucideIcon } from "lucide-react";
import { BenefitsList } from "@/components/cms/BenefitsList";

interface LoginSidebarProps {
  getIcon: (iconName: string) => LucideIcon;
}

export function LoginSidebar({ getIcon }: LoginSidebarProps) {
  return (
    <aside className="hidden h-full flex-col justify-between py-1 lg:flex">
      <div>
        <div className="mb-24">
          <p className="text-4xl font-black tracking-[-0.13em]">
            AZZ<span className="text-violet-500">.</span>
          </p>
          <p className="mt-1 text-sm text-white/50">Portfolio CMS</p>
        </div>
        <h1 className="text-[34px] font-bold leading-[1.2] tracking-tight">
          Manage. Build.
          <br />
          <span className="text-violet-400">Grow.</span>
        </h1>
        <p className="mt-4 max-w-72.5 text-base leading-6 text-white/55">
          AZZ Portfolio CMS helps you manage projects, content, and your
          portfolio website — all in one powerful platform.
        </p>
        <BenefitsList getIcon={getIcon} />
      </div>
      <p className="text-sm text-white/40">© 2025 AZZ. All rights reserved.</p>
    </aside>
  );
}
