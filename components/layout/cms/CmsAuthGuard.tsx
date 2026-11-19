"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiRequest } from "@/lib/api";

type AuthStatus = "checking" | "authorized" | "error";

export function CmsAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    async function checkAuthentication() {
      setStatus("checking");

      try {
        await apiRequest("/api/admin");

        if (active) {
          setStatus("authorized");
        }
      } catch (error) {
        if (!active) return;

        if (error instanceof ApiError && error.status === 401) {
          router.replace("/cms/login");
          return;
        }

        setStatus("error");
      }
    }

    checkAuthentication();

    return () => {
      active = false;
    };
  }, [router, retry]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text-secondary">
        Checking authentication...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-text-primary">
        <p>Unable to verify your authentication.</p>

        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
