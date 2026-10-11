import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { navLinks, type NavLink } from "@/lib/data/nav-links";

export function useNavbarLogic() {
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
    e: MouseEvent<HTMLAnchorElement>,
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

  return {
    pathname,
    activeMenu,
    isMenuOpen,
    handleNavLinkClick,
    handleMenuToggle,
  };
}
