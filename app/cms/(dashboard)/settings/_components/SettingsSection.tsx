import type { ReactNode } from "react";
import { IconBadge } from "@/components/ui/IconBadge";

type SettingsSectionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsSection({
  icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <IconBadge>{icon}</IconBadge>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
        </div>
      </div>

      {/* Isi section sejajar dengan teks judul (lebar IconBadge + gap) */}
      <div className="pl-16">{children}</div>
    </section>
  );
}
