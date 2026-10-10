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
    description: "Here's what's happening with your portfolio.",
    icon: House,
  },
  {
    label: "Hero Section",
    href: "/cms/hero",
    description: "Manage your portfolio introduction.",
    icon: CircleUserRound,
  },
  {
    label: "About",
    href: "/cms/about",
    description: "Manage your personal information.",
    icon: UserPen,
  },
  {
    label: "Tech Stack",
    href: "/cms/tech-stack",
    description: "Manage the technologies you use.",
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
    description: "Manage your professional experience.",
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
    description: "Manage your contact information.",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/cms/settings",
    description: "Configure your CMS preferences.",
    icon: Settings,
  },
];
