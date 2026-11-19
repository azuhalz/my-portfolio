"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { InputField } from "./LoginInput";
import { Button } from "@/components/ui/Button";
import { apiRequest, ApiError } from "@/lib/api";

interface LoginResponse {
  message: string;
  admin: {
    id: number;
    name: string;
    email: string;
  };
}

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await apiRequest<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      router.replace("/cms/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <label className="block text-sm font-medium text-text-primary/80">
        Email
        <InputField
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-text-primary/80">
        Password
        <InputField
          type="password"
          placeholder="••••••••••••"
          icon={Lock}
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
