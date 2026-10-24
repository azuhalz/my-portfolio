"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AboutContentForm } from "./AboutContentForm";
import { useDialog } from "@/hooks/useDialog";
import { initialAboutData, type AboutFormData } from "@/lib/data/about-data";

export type { AboutFormData };

export function AboutCmsPage() {
  const { confirmSave, notifySaved } = useDialog();
  const [formData, setFormData] = useState<AboutFormData>(initialAboutData);

  const handleFieldChange = (field: keyof AboutFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!(await confirmSave("About section"))) return;

    console.log("Saving About Data:", formData);
    await notifySaved("About section");
  };

  return (
    <CmsPageContainer>
      <AboutContentForm
        formData={formData}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
      />
    </CmsPageContainer>
  );
}
