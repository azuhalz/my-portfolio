import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Settings",
};

export default function CmsSettingsPage() {
  return <EmptyCmsPage title="Settings" />;
}
