import { EmptyCmsPage } from "@/app/cms/(dashboard)/dashboard/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Projects",
};

export default function CmsProjectsPage() {
  return <EmptyCmsPage title="Projects" />;
}
