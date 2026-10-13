"use client";

import React from "react";
import { Save, MapPin, Phone, Clock } from "lucide-react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
    <Card className="flex flex-col gap-5 p-6 bg-card/60">
      <h2 className="text-base font-semibold text-text-primary">Content</h2>

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
        rows={6}
      />

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

      <div className="pt-2">
        <Button
          type="button"
          onClick={onSave}
          variant="primary"
          className="w-full justify-center py-2.5 cursor-pointer"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </Button>
      </div>
    </Card>
  );
}
