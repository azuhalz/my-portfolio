"use client";

import { useState } from "react";
import { Mail, Pencil } from "lucide-react";
import { IconInputField } from "@/components/form/IconInputField";
import { Button } from "@/components/ui/Button";
import { SettingsSection } from "./SettingsSection";
import { accountData } from "@/lib/data/settings-data";

export function EmailSettingsSection() {
  const [email, setEmail] = useState(accountData.email);

  const handleSubmit = () => {
    console.log("Changing email to:", email);
    alert("Email berhasil diubah (simulasi)!");
  };

  return (
    <SettingsSection
      icon={<Mail size={22} />}
      title="Email Address"
      description="This email will be used for account login and notifications."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex items-end gap-4"
      >
        <IconInputField
          className="min-w-0 flex-1"
          label="Email"
          type="email"
          autoComplete="email"
          icon={<Mail size={16} />}
          value={email}
          onChange={setEmail}
          placeholder="your.email@example.com"
          required
        />
        <Button
          type="submit"
          variant="primary"
          className="shrink-0 px-5! py-2.5! text-sm rounded-lg! hover:translate-y-0!"
        >
          <Pencil size={16} />
          <span>Change Email</span>
        </Button>
      </form>
    </SettingsSection>
  );
}
