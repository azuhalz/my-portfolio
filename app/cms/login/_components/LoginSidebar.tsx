import { LucideIcon } from "lucide-react";
import { BenefitsList, LoginBenefitIconName } from "./BenefitsList";

interface LoginSidebarProps {
  getIcon: (iconName: LoginBenefitIconName) => LucideIcon;
}

export function LoginSidebar({ getIcon }: LoginSidebarProps) {
  return (
    <aside className="flex h-full flex-col justify-between py-1">
      <div>
        <div className="mb-24">
          <p className="text-4xl font-black tracking-[-0.07em]">
            AZZ<span className="text-primary">.</span>
          </p>
          <p className="mt-1 text-sm text-text-secondary/50">Portfolio CMS</p>
        </div>
        <h1 className="text-[34px] font-bold leading-[1.2] tracking-tight">
          Manage. Build.
          <br />
          <span className="text-primary">Grow.</span>
        </h1>
        <p className="mt-4 max-w-72.5 text-base leading-6 text-text-secondary/55">
          AZZ Portfolio CMS helps you manage projects, content, and your
          portfolio website — all in one powerful platform.
        </p>
        <BenefitsList getIcon={getIcon} />
      </div>
      <p className="text-sm text-text-secondary/40">
        © 2026 Zhafran. All rights reserved.
      </p>
    </aside>
  );
}
