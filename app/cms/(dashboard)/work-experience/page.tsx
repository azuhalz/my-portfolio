import type { Metadata } from "next";
import { WorkExperienceCmsPage } from "./_components/WorkExperienceCmsPage";

export const metadata: Metadata = {
  title: "CMS | Work Experience",
};

export default function CmsWorkExperiencePage() {
  return <WorkExperienceCmsPage />;
}
