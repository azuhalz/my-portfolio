import { MessagesCmsPage } from "./_components/MessagesCmsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | Message",
};

export default function CmsMessagePage() {
  return <MessagesCmsPage />;
}
