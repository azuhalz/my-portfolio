"use client";

import { useState } from "react";
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
    <div className="p-6 md:p-8 max-w-5xl">
      <AboutContentForm
        formData={formData}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
      />
    </div>
  );
}
