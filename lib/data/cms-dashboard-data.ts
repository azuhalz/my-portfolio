import type { LucideIcon } from "lucide-react";
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  CircleUserRound,
  FolderKanban,
  GraduationCap,
  Layers3,
  Mail,
  Plus,
  Settings,
  UserPen,
} from "lucide-react";
import { messagesData } from "@/lib/data/message-data";

export type DashboardMetric = {
  label: string;
  value: string;
  icon: LucideIcon;
  caption?: string;
  trend?: string;
  trendLabel?: string;
  sparkline?: string;
  detail?: string;
};

export type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const upwardSparkline =
  "M4 38 C16 31, 20 42, 33 36 S51 39, 62 29 S76 34, 87 15 S102 25, 108 7";

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total Projects",
    value: "12",
    icon: FolderKanban,
    trend: "2",
    trendLabel: "from last month",
    sparkline: upwardSparkline,
  },
  {
    label: "Total Views",
    value: "2,543",
    icon: CircleUserRound,
    trend: "18.2%",
    trendLabel: "from last month",
    sparkline: upwardSparkline,
  },
  {
    label: "Messages",
    value: String(messagesData.length),
    icon: Mail,
    trend: "3",
    trendLabel: "from last month",
    sparkline: upwardSparkline,
  },
  {
    label: "Last Updated",
    value: "May 25, 2025",
    icon: CalendarDays,
    detail: "10:42 PM",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "Add Project",
    description: "Create a new project for your portfolio",
    icon: Plus,
  },
  {
    title: "Edit About",
    description: "Update your personal information",
    icon: UserPen,
  },
  {
    title: "Add Tech Stack",
    description: "Add new technologies you work with",
    icon: Layers3,
  },
  {
    title: "Add Work Experience",
    description: "Add new work experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Add Education",
    description: "Add your educational background",
    icon: GraduationCap,
  },
  {
    title: "Update Contact",
    description: "Update your contact information",
    icon: Mail,
  },
  {
    title: "Manage Certifications",
    description: "Add or manage your certifications",
    icon: Award,
  },
  {
    title: "Settings",
    description: "Configure CMS preferences",
    icon: Settings,
  },
];
