import type { ReactNode } from "react";

const TONE_STYLES = {
  primary: "bg-primary/15 text-primary shadow-[0_0_24px_rgba(139,92,246,0.12)]",
  danger: "bg-danger/15 text-danger shadow-[0_0_24px_rgba(239,68,68,0.12)]",
  success: "bg-success/15 text-success shadow-[0_0_24px_rgba(34,197,94,0.12)]",
  warning: "bg-warning/15 text-warning shadow-[0_0_24px_rgba(245,158,11,0.12)]",
};

export type IconBadgeTone = keyof typeof TONE_STYLES;

type IconBadgeProps = {
  tone?: IconBadgeTone;
  children: ReactNode;
};

// Kotak ikon yang dipakai di kartu metrik, header section, dan dialog CMS
export function IconBadge({ tone = "primary", children }: IconBadgeProps) {
  return (
    <span
      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}
