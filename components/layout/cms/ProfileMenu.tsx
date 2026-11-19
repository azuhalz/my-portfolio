"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { apiRequest } from "@/lib/api";

export function ProfileMenu() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      await apiRequest<{ message: string }>("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/cms/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  }

  return (
    <Dropdown
      panelClassName="w-56"
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label="Open account menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-4 rounded-lg text-left"
        >
          <Image
            src="/profile4.png"
            alt="Admin User"
            width={46}
            height={46}
            className="size-11 rounded-full border border-primary/60 object-cover"
          />
          <div className="leading-5">
            <p className="text-sm font-medium">Zhafran</p>
            <p className="text-xs text-text-secondary">
              ahmadzuhalzhafran@gmail.com
            </p>
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              isOpen ? "rotate-180 text-primary" : "text-text-secondary"
            }`}
          />
        </button>
      )}
    >
      {({ close }) => (
        <div role="menu" className="p-2">
          <button
            type="button"
            role="menuitem"
            disabled={loading}
            onClick={() => {
              close();
              handleLogout();
            }}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
          >
            <LogOut size={18} />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      )}
    </Dropdown>
  );
}
