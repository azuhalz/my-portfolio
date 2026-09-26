import { EmptyCmsPage } from "@/app/cms/(dashboard)/dashboard/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Hero",
};

export default function CmsHeroPage() {
  return <EmptyCmsPage title="Hero Section" />;
}
