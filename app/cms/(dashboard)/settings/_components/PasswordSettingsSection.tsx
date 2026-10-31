"use client";

import { Lock } from "lucide-react";
import { PasswordInputField } from "@/components/form/PasswordInputField";
import { Button } from "@/components/ui/Button";
import { SettingsSection } from "./SettingsSection";
import { useDialog } from "@/hooks/useDialog";
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
  const { confirm, notify } = useDialog();

  const handleSubmit = async () => {
    if (formData.newPassword.length < MIN_PASSWORD_LENGTH) {
      await notify({
        tone: "warning",
        title: "Password too short",
        description: `Your new password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      await notify({
        tone: "warning",
        title: "Passwords don't match",
        description:
          "The confirmation password must be the same as your new password.",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Update password?",
      description: "You will need the new password the next time you sign in.",
      confirmLabel: "Update Password",
    });
    if (!confirmed) return;

    await notify({
      tone: "success",
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
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
