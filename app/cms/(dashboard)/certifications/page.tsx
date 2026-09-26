import { EmptyCmsPage } from "@/app/cms/(dashboard)/_components/EmptyCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Certifications",
};

export default function CmsCertificationsPage() {
  return <EmptyCmsPage title="Certifications" />;
}
