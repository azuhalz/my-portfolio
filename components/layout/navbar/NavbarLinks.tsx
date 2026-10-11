import Link from "next/link";
import type { MouseEvent } from "react";
import { navLinks, type NavLink } from "@/lib/data/nav-links";

const activeLinkStyle =
  "bg-primary/30 text-white px-4 py-2 rounded-full transition-colors";
const inactiveLinkStyle =
  "text-text-secondary hover:text-white px-4 py-2 rounded-full transition-colors";

type NavbarLinksProps = {
  pathname: string;
  activeMenu: string;
  variant?: "desktop" | "mobile";
  onLinkClick: (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavLink,
    isMobile: boolean,
  ) => void;
};

export function NavbarLinks({
  pathname,
  activeMenu,
  variant = "desktop",
  onLinkClick,
}: NavbarLinksProps) {
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith("/projects")
          ? link.id === "projects"
          : activeMenu === link.id;

        return (
          <Link
            key={link.id}
            href={link.href}
            onClick={(e) => onLinkClick(e, link, variant === "mobile")}
            className={`${isActive ? activeLinkStyle : inactiveLinkStyle}${
              variant === "mobile" ? " block text-left" : ""
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
