"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveMenu(hash);
    } else if (pathname === "/projects") {
      setActiveMenu("projects");
    } else {
      setActiveMenu("");
    }
  }, [pathname]);

  const activeLinkStyle =
    "bg-primary/30 text-white px-4 py-2 rounded-full transition-colors text-md";
  const inactiveLinkStyle =
    "text-text-secondary hover:text-white px-4 py-2 rounded-full transition-colors text-md";

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setActiveMenu("")}
          className="flex items-center text-3xl font-bold border border-primary rounded-4xl py-1.5 px-5"
        >
          AZZ<span className="text-primary">.</span>
        </Link>

        <div className="flex gap-2 items-center border border-primary rounded-4xl py-2 px-6">
          <Link
            href="/#about"
            onClick={() => setActiveMenu("about")}
            className={
              activeMenu === "about" ? activeLinkStyle : inactiveLinkStyle
            }
          >
            About
          </Link>

          <Link
            href="/projects"
            onClick={() => setActiveMenu("projects")}
            className={
              activeMenu === "projects" ? activeLinkStyle : inactiveLinkStyle
            }
          >
            Projects
          </Link>

          <Link
            href="/#experience"
            onClick={() => setActiveMenu("experience")}
            className={
              activeMenu === "experience" ? activeLinkStyle : inactiveLinkStyle
            }
          >
            Experience
          </Link>

          <Link
            href="/#education"
            onClick={() => setActiveMenu("education")}
            className={
              activeMenu === "education" ? activeLinkStyle : inactiveLinkStyle
            }
          >
            Education
          </Link>

          <Link
            href="/#certifications"
            onClick={() => setActiveMenu("certifications")}
            className={
              activeMenu === "certifications"
                ? activeLinkStyle
                : inactiveLinkStyle
            }
          >
            Certifications
          </Link>

          <Link
            href="/#contact"
            onClick={() => setActiveMenu("contact")}
            className={
              activeMenu === "contact" ? activeLinkStyle : inactiveLinkStyle
            }
          >
            Contact
          </Link>
        </div>

        <div>
          <Button href="/cv-zuhal.pdf" variant="outline">
            <span>Download CV</span>
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
