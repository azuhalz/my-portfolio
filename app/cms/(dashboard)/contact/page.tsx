import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Contact",
};

export default function CmsContactPage() {
  return <EmptyCmsPage title="Contact" />;
}
