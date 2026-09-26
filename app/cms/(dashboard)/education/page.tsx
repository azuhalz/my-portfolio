import { EmptyCmsPage } from "@/app/cms/(dashboard)/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Education",
};

export default function CmsEducationPage() {
  return <EmptyCmsPage title="Education" />;
}
