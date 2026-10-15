"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  IconInputField,
  type IconInputFieldProps,
} from "@/components/form/IconInputField";

type PasswordInputFieldProps = Omit<
  IconInputFieldProps,
  "icon" | "iconPosition" | "type" | "endAdornment"
>;

export function PasswordInputField(props: PasswordInputFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <IconInputField
      {...props}
      icon={<Lock size={16} />}
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="cursor-pointer text-text-secondary transition-colors hover:text-text-primary"
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      }
    />
  );
}
