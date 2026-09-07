"use client";

import Image from "next/image";
import { Button } from "../ui/Button";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-5">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <span className="text-white font-bold text-3xl">
          AZZ<span className="text-primary">.</span>
        </span>
        <p className="text-text-secondary text-md">
          © 2026 Zhafran. All rights reserved.
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          variant="outline"
          className="text-xl"
        >
          ↑
        </Button>
      </div>
    </footer>
  );
}
