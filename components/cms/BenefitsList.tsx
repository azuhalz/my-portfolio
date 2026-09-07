import { LucideIcon } from "lucide-react";

const benefits = [
  {
    icon: "Zap",
    title: "Powerful & Fast",
    description: "Built for speed and productivity.",
  },
  {
    icon: "Shield",
    title: "Secure & Reliable",
    description: "Your data is safe with enterprise-grade security.",
  },
  {
    icon: "ChartLine",
    title: "Insights That Matter",
    description: "Track performance and make smarter decisions.",
  },
];

interface BenefitsListProps {
  getIcon: (iconName: string) => LucideIcon;
}

export function BenefitsList({ getIcon }: BenefitsListProps) {
  return (
    <div className="mt-10 space-y-6">
      {benefits.map(({ icon: iconName, title, description }) => {
        const Icon = getIcon(iconName);
        return (
          <div className="flex gap-4" key={title}>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-700/15 text-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.12)]">
              <Icon size={22} />
            </span>
            <div>
              <p className="font-medium text-white/85">{title}</p>
              <p className="mt-1 text-sm leading-5 text-white/45">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
