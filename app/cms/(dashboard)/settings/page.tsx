import { EmptyCmsPage } from "@/app/cms/(dashboard)/dashboard/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Settings",
};

export default function CmsSettingsPage() {
  return <EmptyCmsPage title="Settings" />;
}
