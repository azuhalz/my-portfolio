"use client";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarActions";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { useNavbarLogic } from "@/hooks/useNavbarLogic";

export function Navbar() {
  const {
    pathname,
    activeMenu,
    isMenuOpen,
    handleNavLinkClick,
    handleMenuToggle,
  } = useNavbarLogic();

  return (
    <nav className="sticky top-0 z-10 bg-background">
      <div className="mx-auto px-6 pt-4 flex items-center justify-between">
        <NavbarLogo />

        <div className="hidden lg:flex gap-2 items-center border border-primary rounded-4xl py-1.5 px-6">
          <NavbarLinks
            pathname={pathname}
            activeMenu={activeMenu}
            onLinkClick={handleNavLinkClick}
          />
        </div>

        <NavbarActions
          isMenuOpen={isMenuOpen}
          onMenuToggle={handleMenuToggle}
        />
      </div>

      <NavbarMobileMenu
        isOpen={isMenuOpen}
        pathname={pathname}
        activeMenu={activeMenu}
        onLinkClick={handleNavLinkClick}
      />
    </nav>
  );
}
