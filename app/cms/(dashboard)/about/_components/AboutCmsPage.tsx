"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AboutContentForm } from "./AboutContentForm";
import { initialAboutData, type AboutFormData } from "@/lib/data/about-data";

export type { AboutFormData };

export function AboutCmsPage() {
  const [formData, setFormData] = useState<AboutFormData>(initialAboutData);

  const handleFieldChange = (field: keyof AboutFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving About Data:", formData);
    alert("Perubahan About Section berhasil disimpan (simulasi)!");
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
