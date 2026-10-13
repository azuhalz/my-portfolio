"use client";

import { Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextInputField } from "@/components/form/TextInputField";
import { ImageUploadField } from "@/components/form/ImageUploadField";
import { HeroSocialLinksForm } from "./HeroSocialLinksForm";
import type { HeroFormData } from "@/lib/data/hero-data";

type HeroContentFormProps = {
  formData: HeroFormData;
  onFieldChange: (field: keyof HeroFormData, value: string) => void;
  onSocialChange: (index: number, url: string) => void;
  onImageChange: (url: string, fileName?: string) => void;
  onSave: () => void;
};

type HeroTextFieldConfig = {
  key: keyof Pick<
    HeroFormData,
    "greetingText" | "displayName" | "headline" | "workButton" | "contactButton"
  >;
  label: string;
  placeholder: string;
};

const HERO_TEXT_FIELDS: readonly HeroTextFieldConfig[] = [
  {
    key: "greetingText",
    label: "Greeting Text",
    placeholder: "Hi, I'm",
  },
  {
    key: "displayName",
    label: "Display Name",
    placeholder: "Zuhal",
  },
  {
    key: "headline",
    label: "Role / Headline",
    placeholder: "Computer Science Graduate & Developer",
  },
  {
    key: "workButton",
    label: "Work Button Text",
    placeholder: "View My Work",
  },
  {
    key: "contactButton",
    label: "Contact Button Text",
    placeholder: "Contact Me",
  },
];

export function HeroContentForm({
  formData,
  onFieldChange,
  onSocialChange,
  onImageChange,
  onSave,
}: HeroContentFormProps) {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8 bg-card/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Kolom Kiri: Teks & Informasi Utama */}
        <div className="flex flex-col gap-4">
          {HERO_TEXT_FIELDS.map((field) => (
            <TextInputField
              key={field.key}
              label={field.label}
              value={formData[field.key]}
              onChange={(val) => onFieldChange(field.key, val)}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        {/* Kolom Kanan: Social Links & Hero Image */}
        <div className="flex flex-col gap-5">
          <HeroSocialLinksForm
            socials={formData.socials}
            onChange={onSocialChange}
          />

          <ImageUploadField
            label="Hero Image"
            imageUrl={formData.profileImageUrl}
            fileName={formData.profileImageName}
            onChange={onImageChange}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border/60 flex justify-end">
        <Button
          type="button"
          onClick={onSave}
          variant="primary"
          className="w-full sm:w-auto px-6 py-2.5 cursor-pointer"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </Button>
      </div>
    </Card>
  );
}
