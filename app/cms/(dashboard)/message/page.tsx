import { EmptyCmsPage } from "@/app/cms/(dashboard)/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Message",
};

export default function CmsMessagePage() {
  return <EmptyCmsPage title="Message" />;
}
