import type { LucideIcon } from "lucide-react";
import {
  Award,
  BriefcaseBusiness,
  CircleUserRound,
  FolderKanban,
  GraduationCap,
  House,
  Layers3,
  Mail,
  Settings,
  UserPen,
  UsersRound,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/cms/dashboard",
    description:
      "Welcome back, Zhafran! 👋 Here's what's happening with your portfolio.",
    icon: House,
  },
  {
    label: "Hero Section",
    href: "/cms/hero",
    description: "Edit the content of your hero section.",
    icon: CircleUserRound,
  },
  {
    label: "About",
    href: "/cms/about",
    description: "Edit the content of your about section.",
    icon: UserPen,
  },
  {
    label: "Tech Stack",
    href: "/cms/tech-stack",
    description: "Edit the content of your tech stack section.",
    icon: Layers3,
  },
  {
    label: "Projects",
    href: "/cms/projects",
    description: "Manage your portfolio projects.",
    icon: FolderKanban,
  },
  {
    label: "Work Experience",
    href: "/cms/work-experience",
    description: "Manage your work experience.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Education",
    href: "/cms/education",
    description: "Manage your educational background.",
    icon: GraduationCap,
  },
  {
    label: "Organizational Experience",
    href: "/cms/organizational-experience",
    description: "Manage your organizational experience.",
    icon: UsersRound,
  },
  {
    label: "Certifications",
    href: "/cms/certifications",
    description: "Manage your certifications.",
    icon: Award,
  },
  {
    label: "Contact",
    href: "/cms/contact",
    description: "Edit the content of your contact section.",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/cms/settings",
    description: "Configure your CMS preferences.",
    icon: Settings,
  },
];
