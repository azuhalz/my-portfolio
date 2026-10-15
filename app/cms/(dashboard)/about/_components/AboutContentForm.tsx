"use client";

import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { Card } from "@/components/ui/Card";
import { SaveChangesButton } from "@/components/form/SaveChangesButton";
import { TextInputField } from "@/components/form/TextInputField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { IconInputField } from "@/components/form/IconInputField";
import type { AboutFormData } from "@/lib/data/about-data";

type AboutContentFormProps = {
  formData: AboutFormData;
  onFieldChange: (field: keyof AboutFormData, value: string) => void;
  onSave: () => void;
};

// Konfigurasi field berikon agar render modular & clean code
type AboutIconFieldConfig = {
  key: keyof Pick<
    AboutFormData,
    | "location"
    | "phone"
    | "email"
    | "linkedinUrl"
    | "githubUrl"
    | "availability"
  >;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
};

const ABOUT_ICON_FIELDS: readonly AboutIconFieldConfig[] = [
  {
    key: "location",
    label: "Location",
    icon: <MapPin size={16} />,
    placeholder: "Malang, Indonesia",
  },
  {
    key: "phone",
    label: "Phone",
    icon: <Phone size={16} />,
    placeholder: "+62 853-3083-5455",
  },
  {
    key: "email",
    label: "Email",
    icon: <FaEnvelope size={16} />,
    placeholder: "your.email@example.com",
    type: "email",
  },
  {
    key: "linkedinUrl",
    label: "LinkedIn URL",
    icon: <FaLinkedin size={16} />,
    placeholder: "linkedin.com/in/username",
  },
  {
    key: "githubUrl",
    label: "GitHub URL",
    icon: <FaGithub size={16} />,
    placeholder: "github.com/username",
  },
  {
    key: "availability",
    label: "Availability",
    icon: <Clock size={16} />,
    placeholder: "Open to opportunities",
  },
];

export function AboutContentForm({
  formData,
  onFieldChange,
  onSave,
}: AboutContentFormProps) {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8 bg-card/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Kolom Kiri: Title & Bio */}
        <div className="flex flex-col gap-4">
          <TextInputField
            label="Section Title"
            value={formData.sectionTitle}
            onChange={(val) => onFieldChange("sectionTitle", val)}
            placeholder="About Me"
          />

          <TextAreaField
            label="About Paragraph"
            value={formData.description}
            onChange={(val) => onFieldChange("description", val)}
            placeholder="Deskripsi profil..."
            rows={8}
          />
        </div>

        {/* Kolom Kanan: Contact Details & Info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3.5">
            {ABOUT_ICON_FIELDS.map((field) => (
              <IconInputField
                key={field.key}
                label={field.label}
                icon={field.icon}
                value={formData[field.key]}
                onChange={(val) => onFieldChange(field.key, val)}
                placeholder={field.placeholder}
                type={field.type}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/60 flex justify-end">
        <SaveChangesButton onClick={onSave} className="w-full sm:w-auto" />
      </div>
    </Card>
  );
}
