import { ContactCmsPage } from "./_components/ContactCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Contact",
};

export default function CmsContactPage() {
  return <ContactCmsPage />;
}
