import { EmptyCmsPage } from "@/app/cms/(dashboard)/dashboard/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | About",
};

export default function CmsAboutPage() {
  return <EmptyCmsPage title="About" />;
}
