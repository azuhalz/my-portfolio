import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Education",
};

export default function CmsEducationPage() {
  return <EmptyCmsPage title="Education" />;
}
