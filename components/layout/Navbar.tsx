"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", id: "about", href: "/#about" },
  { name: "Projects", id: "projects", href: "/projects" },
  { name: "Experience", id: "experience", href: "/#experience" },
  { name: "Education", id: "education", href: "/#education" },
  { name: "Certifications", id: "certifications", href: "/#certifications" },
  { name: "Contact", id: "contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");
  // State untuk membuka/menutup menu hamburger di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/projects")) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 100) {
        setActiveMenu("about");
        return;
      }

      if (
        window.innerHeight + Math.round(scrollPosition) >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveMenu("contact");
        return;
      }

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveMenu(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeLinkStyle =
    "bg-primary/30 text-white px-4 py-2 rounded-full transition-colors";
  const inactiveLinkStyle =
    "text-text-secondary hover:text-white px-4 py-2 rounded-full transition-colors";

  function handleNavLinkClick(e: React.MouseEvent, link: (typeof navLinks)[0]) {
    // Tutup menu hamburger saat link diklik
    setIsMenuOpen(false);

    if (pathname === "/" && link.href.includes("#")) {
      e.preventDefault();
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", link.href);
        setActiveMenu(link.id);
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="mx-auto px-6 pt-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center text-3xl font-bold border border-primary rounded-4xl py-1.5 px-5"
        >
          AZZ<span className="text-primary">.</span>
        </Link>

        {/* MENU DESKTOP — tersembunyi di layar kecil, muncul di layar besar (lg ke atas) */}
        <div className="hidden lg:flex gap-2 items-center border border-primary rounded-4xl py-1.5 px-6">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith("/projects")
              ? link.id === "projects"
              : activeMenu === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className={isActive ? activeLinkStyle : inactiveLinkStyle}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* TOMBOL DAN HAMBURGER */}
        <div className="flex items-center gap-3">
          {/* Tombol Download CV — tersembunyi di layar kecil */}
          <div className="hidden lg:block">
            <Button
              href="/CV_AhmadZuhalZhafran.pdf"
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              <span>Download CV</span>
              <Download className="h-5 w-5" />
            </Button>
          </div>

          {/* Ikon hamburger menu — hanya muncul di layar kecil (mobile & tablet) */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE — hanya muncul saat hamburger diklik */}
      {isMenuOpen && (
        <div className="lg:hidden px-6 pb-4 pt-2 flex flex-col gap-2 bg-background border-t border-border">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith("/projects")
              ? link.id === "projects"
              : activeMenu === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className={`${isActive ? activeLinkStyle : inactiveLinkStyle} block text-left`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Tombol Download CV di mobile menu */}
          <div className="mt-2">
            <Button
              href="/CV_AhmadZuhalZhafran.pdf"
              variant="outline"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <span>Download CV</span>
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
