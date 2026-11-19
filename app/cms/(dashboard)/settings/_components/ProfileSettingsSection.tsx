"use client";

import { useState } from "react";
import { User, Mail } from "lucide-react";
import { IconInputField } from "@/components/form/IconInputField";
import { Button } from "@/components/ui/Button";
import { SettingsSection } from "./SettingsSection";
import { useDialog } from "@/hooks/useDialog";
import { accountData, type AccountData } from "@/lib/data/settings-data";

export function ProfileSettingsSection() {
  const [profile, setProfile] = useState<AccountData>({
    name: accountData.name,
    email: accountData.email,
  });
  const { confirm, notify } = useDialog();

  const handleSubmit = async () => {
    if (!profile.name.trim()) {
      await notify({
        tone: "warning",
        title: "Name required",
        description: "Please enter your name.",
      });
      return;
    }

    if (!profile.email.trim()) {
      await notify({
        tone: "warning",
        title: "Email required",
        description: "Please enter your email address.",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Save profile changes?",
      description: `Your name will be set to "${profile.name}" and email to "${profile.email}".`,
      confirmLabel: "Update Profile",
    });
    if (!confirmed) return;

    console.log("Updating profile:", profile);
    await notify({
      tone: "success",
      title: "Profile updated",
      description: "Your profile information has been successfully saved.",
    });
  };

  return (
    <SettingsSection
      icon={<User size={22} />}
      title="Profile Information"
      description="Update your account display name and login email address."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <IconInputField
          label="Name"
          type="text"
          autoComplete="name"
          icon={<User size={16} />}
          value={profile.name}
          onChange={(name) => setProfile((prev) => ({ ...prev, name }))}
          placeholder="Your Name"
          required
        />
        <IconInputField
          label="Email"
          type="email"
          autoComplete="email"
          icon={<Mail size={16} />}
          value={profile.email}
          onChange={(email) => setProfile((prev) => ({ ...prev, email }))}
          placeholder="your.email@example.com"
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full px-5! py-2.5! text-sm rounded-lg! hover:translate-y-0!"
        >
          <User size={16} />
          <span>Update Profile</span>
        </Button>
      </form>
    </SettingsSection>
  );
}
