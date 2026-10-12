import type { Metadata } from "next";
import { HeroCmsPage } from "./_components/HeroCmsPage";

export const metadata: Metadata = {
  title: "CMS | Hero",
};

export default function CmsHeroPage() {
  return <HeroCmsPage />;
}
