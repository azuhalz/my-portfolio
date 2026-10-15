"use client";

import { Lock } from "lucide-react";
import { PasswordInputField } from "@/components/form/PasswordInputField";
import { Button } from "@/components/ui/Button";
import { SettingsSection } from "./SettingsSection";
import { useFormFields } from "@/hooks/useFormFields";
import {
  initialPasswordFormData,
  MIN_PASSWORD_LENGTH,
  type PasswordFormData,
} from "@/lib/data/settings-data";

export function PasswordSettingsSection() {
  const { formData, handleFieldChange } = useFormFields<PasswordFormData>(
    initialPasswordFormData,
  );

  const handleSubmit = () => {
    if (formData.newPassword.length < MIN_PASSWORD_LENGTH) {
      alert(`Password minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Konfirmasi password tidak cocok.");
      return;
    }

    alert("Password berhasil diperbarui (simulasi)!");
    handleFieldChange("newPassword", "");
    handleFieldChange("confirmPassword", "");
  };

  return (
    <SettingsSection
      icon={<Lock size={22} />}
      title="Password"
      description="Keep your account secure by using a strong password."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <PasswordInputField
          label="New Password"
          autoComplete="new-password"
          value={formData.newPassword}
          onChange={(value) => handleFieldChange("newPassword", value)}
          placeholder="Enter new password"
          required
        />
        <PasswordInputField
          label="Confirm New Password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={(value) => handleFieldChange("confirmPassword", value)}
          placeholder="Re-enter new password"
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full px-5! py-2.5! text-sm rounded-lg! hover:translate-y-0!"
        >
          <Lock size={16} />
          <span>Update Password</span>
        </Button>
      </form>
    </SettingsSection>
  );
}
