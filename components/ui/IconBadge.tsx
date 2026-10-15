import type { ReactNode } from "react";

type IconBadgeProps = {
  children: ReactNode;
};

// Kotak ikon ungu yang dipakai di kartu metrik dan header section CMS
export function IconBadge({ children }: IconBadgeProps) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-[0_0_24px_rgba(139,92,246,0.12)]">
      {children}
    </span>
  );
}
