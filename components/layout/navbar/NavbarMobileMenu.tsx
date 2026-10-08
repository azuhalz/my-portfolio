import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavbarLinks } from "./NavbarLinks";
import type { NavLink } from "@/lib/data/nav-links";

type NavbarMobileMenuProps = {
  isOpen: boolean;
  pathname: string;
  activeMenu: string;
  onLinkClick: (
    event: React.MouseEvent,
    link: NavLink,
    isMobile: boolean,
  ) => void;
};

export function NavbarMobileMenu({
  isOpen,
  pathname,
  activeMenu,
  onLinkClick,
}: NavbarMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden px-6 pb-4 pt-2 flex flex-col gap-2 bg-background border-t border-border">
      <NavbarLinks
        pathname={pathname}
        activeMenu={activeMenu}
        variant="mobile"
        onLinkClick={onLinkClick}
      />

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
  );
}
