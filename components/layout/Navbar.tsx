"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { navLinks, type NavLink } from "../../lib/data/nav-links";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const isProjectsRoute = pathname.startsWith("/projects");
  const [activeMenu, setActiveMenu] = useScrollSpy(navLinks, isProjectsRoute);
  // State untuk membuka/menutup menu hamburger di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingMobileLink, setPendingMobileLink] = useState<NavLink | null>(
    null,
  );

  const scrollToSection = useCallback(
    (link: NavLink) => {
      const element = document.getElementById(link.id);
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", link.href);
      setActiveMenu(link.id);
    },
    [setActiveMenu],
  );

  useEffect(() => {
    if (isMenuOpen || !pendingMobileLink) return;

    const animationFrame = window.requestAnimationFrame(() => {
      scrollToSection(pendingMobileLink);
      setPendingMobileLink(null);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isMenuOpen, pendingMobileLink, scrollToSection]);

  function handleNavLinkClick(
    e: React.MouseEvent,
    link: NavLink,
    isMobile: boolean,
  ) {
    if (pathname !== "/" || !link.href.includes("#")) {
      if (isMobile) {
        setIsMenuOpen(false);
      }

      return;
    }

    e.preventDefault();

    if (isMobile) {
      setPendingMobileLink(link);
      setIsMenuOpen(false);
      return;
    }

    scrollToSection(link);
  }

  function handleMenuToggle() {
    if (!isMenuOpen) {
      setPendingMobileLink(null);
    }

    setIsMenuOpen((currentValue) => !currentValue);
  }

  return (
    <nav className="sticky top-0 z-10 bg-background">
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
          <NavLinks
            pathname={pathname}
            activeMenu={activeMenu}
            onLinkClick={handleNavLinkClick}
          />
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
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE — hanya muncul saat hamburger diklik */}
      <MobileMenu
        isOpen={isMenuOpen}
        pathname={pathname}
        activeMenu={activeMenu}
        onLinkClick={handleNavLinkClick}
      />
    </nav>
  );
}
