"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { HeroContentForm } from "./HeroContentForm";
import { initialHeroData, type HeroFormData } from "@/lib/data/hero-data";

export type { HeroFormData };
export function HeroCmsPage() {
  const [formData, setFormData] = useState<HeroFormData>(initialHeroData);
  const handleFieldChange = (field: keyof HeroFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (index: number, newUrl: string) => {
    setFormData((prev) => {
      const updatedSocials = [...prev.socials];
      updatedSocials[index] = {
        ...updatedSocials[index],
        url: newUrl,
      };
      return {
        ...prev,
        socials: updatedSocials,
      };
    });
  };

  const handleImageChange = (newUrl: string, newFileName?: string) => {
    setFormData((prev) => ({
      ...prev,
      profileImageUrl: newUrl,
      profileImageName: newFileName || (newUrl ? "uploaded-image.png" : ""),
    }));
  };

  const handleSave = () => {
    console.log("Saving Hero Section Data:", formData);
    alert("Perubahan Hero Section berhasil disimpan (simulasi)!");
  };

  return (
    <CmsPageContainer>
      <HeroContentForm
        formData={formData}
        onFieldChange={handleFieldChange}
        onSocialChange={handleSocialChange}
        onImageChange={handleImageChange}
        onSave={handleSave}
      />
    </CmsPageContainer>
  );
}
