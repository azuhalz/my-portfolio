import { EmptyCmsPage } from "@/app/cms/(dashboard)/dashboard/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Contact",
};

export default function CmsContactPage() {
  return <EmptyCmsPage title="Contact" />;
}
