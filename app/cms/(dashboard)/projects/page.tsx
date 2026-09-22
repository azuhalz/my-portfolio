import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Projects",
};

export default function CmsProjectsPage() {
  return <EmptyCmsPage title="Projects" />;
}
