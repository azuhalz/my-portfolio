"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <span className="text-primary font-bold">
            <Image src="/logo_azz.png" alt="AZZ Logo" width={80} height={120} />
          </span>
          <p className="text-text-secondary text-sm mt-1">
            © 2025 Ahmad Zuhal Zhafran. All rights reserved.
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
