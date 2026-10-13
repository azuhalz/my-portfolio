import { ProjectCmsPage } from "./_components/ProjectsCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Projects",
};

export default function CmsProjectsPage() {
  return <ProjectCmsPage />;
}
