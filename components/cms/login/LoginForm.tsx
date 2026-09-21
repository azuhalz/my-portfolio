"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { InputField } from "@/components/cms/login/InputField";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <label className="block text-sm font-medium text-text-primary/80">
        Email
        <InputField type="email" placeholder="you@example.com" icon={Mail} />
      </label>
      <label className="block text-sm font-medium text-text-primary/80">
        Password
        <InputField
          type="password"
          placeholder="••••••••••••"
          icon={Lock}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((visible) => !visible)}
        />
      </label>
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-text-secondary/60">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 appearance-none rounded border border-primary bg-transparent checked:bg-primary checked:after:block checked:after:text-center checked:after:text-xs checked:after:leading-3.5 checked:after:text-text-primary checked:after:content-['✓']"
          />
          Remember me
        </label>
        <button
          type="button"
          className="font-medium text-primary transition hover:text-primary-hover"
        >
          Forgot password?
        </button>
      </div>
      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-linear-to-r from-primary to-primary-hover font-semibold shadow-[0_8px_24px_rgba(124,58,237,0.4)] transition hover:from-primary-hover hover:to-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        Sign In
      </button>
    </form>
  );
}
