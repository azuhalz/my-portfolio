export type NavLink = {
  name: string;
  id: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { name: "About", id: "about", href: "/#about" },
  { name: "Projects", id: "projects", href: "/projects" },
  { name: "Experience", id: "experience", href: "/#experience" },
  { name: "Education", id: "education", href: "/#education" },
  { name: "Certifications", id: "certifications", href: "/#certifications" },
  { name: "Contact", id: "contact", href: "/#contact" },
];
