import { EmptyCmsPage } from "@/components/cms/dashboard/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | About",
};

export default function CmsAboutPage() {
  return <EmptyCmsPage title="About" />;
}
