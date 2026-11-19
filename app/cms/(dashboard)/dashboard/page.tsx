import type { Metadata } from "next";
import { DashboardContent } from "./_components/DashboardContent";

export const metadata: Metadata = {
  title: "CMS | Dashboard",
};

export default function CmsDashboardPage() {
  return <DashboardContent />;
}
