"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-3xl font-bold border border-primary rounded-4xl py-1.5 px-5"
        >
          AZZ<span className="text-primary">.</span>
        </Link>

        <div className="flex gap-10 items-center border border-primary rounded-4xl py-3 px-10">
          <Link
            href="/#about"
            className="text-md text-text-secondary hover:text-white transition-colors"
          >
            About
          </Link>

          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? "text-md text-primary transition-colors"
                : "text-md text-text-secondary hover:text-white transition-colors"
            }
          >
            Projects
          </Link>

          <Link
            href="/#experience"
            className="text-md text-text-secondary hover:text-white transition-colors"
          >
            Experience
          </Link>

          <Link
            href="/#education"
            className="text-md text-text-secondary hover:text-white transition-colors"
          >
            Education
          </Link>

          <Link
            href="/#certifications"
            className="text-md text-text-secondary hover:text-white transition-colors"
          >
            Certifications
          </Link>

          <Link
            href="/#contact"
            className="text-md text-text-secondary hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        <div>
          <Button href="/cv-zuhal.pdf" variant="outline">
            Download CV ↓
          </Button>
        </div>
      </div>
    </nav>
  );
}
