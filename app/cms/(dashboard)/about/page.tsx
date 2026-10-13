import type { Metadata } from "next";
import { AboutCmsPage } from "./_components/AboutCmsPage";

export const metadata: Metadata = {
  title: "CMS | About",
};

export default function CmsAboutPage() {
  return <AboutCmsPage />;
}
