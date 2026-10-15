import { SettingsCmsPage } from "./_components/SettingsCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Settings",
};

export default function CmsSettingsPage() {
  return <SettingsCmsPage />;
}
