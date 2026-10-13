"use client";

import { useState } from "react";
import AboutMe from "@/components/sections/AboutMe";
import { AboutContentForm } from "./AboutContentForm";
import { LivePreview } from "@/components/ui/LivePreview";
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
    <div className="p-6 md:p-8">
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">About Section</h1>
        <p className="text-sm text-text-secondary mt-1">
          Edit the content of your about section.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[440px_1fr] items-start gap-6">
        <AboutContentForm
          formData={formData}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
        />
        <LivePreview>
          <AboutMe />
        </LivePreview>
      </div>
    </div>
  );
}
