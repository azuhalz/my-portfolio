import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Hero",
};

export default function CmsHeroPage() {
  return <EmptyCmsPage title="Hero Section" />;
}
