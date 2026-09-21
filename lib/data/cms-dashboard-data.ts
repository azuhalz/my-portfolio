import type { LucideIcon } from "lucide-react";
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  CircleUserRound,
  FolderKanban,
  GraduationCap,
  House,
  Layers3,
  Mail,
  MailPlus,
  Plus,
  Settings,
  ShieldCheck,
  UserPen,
  UsersRound,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type DashboardMetric = {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendLabel?: string;
  sparkline?: string;
  detail?: string;
};

export type RecentProject = {
  title: string;
  type: string;
  image: string;
  date: string;
  time: string;
};

export type RecentMessage = {
  initials: string;
  name: string;
  email: string;
  excerpt: string;
  receivedAt: string;
};

export type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Dashboard", icon: House, active: true },
  { label: "Hero Section", icon: CircleUserRound },
  { label: "About", icon: UserPen },
  { label: "Tech Stack", icon: Layers3 },
  { label: "Projects", icon: FolderKanban },
  { label: "Work Experience", icon: BriefcaseBusiness },
  { label: "Education", icon: GraduationCap },
  { label: "Organizational Experience", icon: UsersRound },
  { label: "Certifications", icon: Award },
  { label: "Contact", icon: Mail },
  { label: "Settings", icon: Settings },
];

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
    value: "7",
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

export const recentProjects: RecentProject[] = [
  {
    title: "Travel Explorer Web",
    type: "Web Application",
    image: "/images/challenge7/ban1.jpeg",
    date: "May 25, 2025",
    time: "10:42 PM",
  },
  {
    title: "Dashboard Analytics",
    type: "Web Application",
    image: "/images/challenge4/banner.png",
    date: "May 24, 2025",
    time: "08:30 PM",
  },
  {
    title: "eCommerce Website",
    type: "Web Application",
    image: "/images/challenge5/banner2.png",
    date: "May 23, 2025",
    time: "06:15 PM",
  },
  {
    title: "iOS Task Manager App",
    type: "Mobile Application",
    image: "/images/challenge3/banner1.png",
    date: "May 22, 2025",
    time: "07:40 PM",
  },
];

export const analyticsSummary = [
  { label: "Visitors", value: "1,802", trend: "12.5%" },
  { label: "Page Views", value: "4,672", trend: "15.3%" },
  { label: "Bounce Rate", value: "32.8%", trend: "5.2%" },
  { label: "Avg. Time", value: "2m 45s", trend: "8.7%" },
];

export const analyticsValues = [
  620, 510, 760, 1090, 810, 570, 920, 710, 820, 825, 1280, 1510, 1810, 1600,
  1050, 1490, 1890, 1770, 1420, 1310, 1450, 1800,
];
export const analyticsYAxis = ["2K", "1.5K", "1K", "500", "0"];
export const analyticsXAxis = ["Apr 26", "May 3", "May 10", "May 17", "May 24"];

export const recentMessages: RecentMessage[] = [
  {
    initials: "JD",
    name: "John Doe",
    email: "john@example.com",
    excerpt: "Hi Admin, I'm interested in collaborating on a project.",
    receivedAt: "2h ago",
  },
  {
    initials: "SJ",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    excerpt: "Great portfolio! Can we discuss a potential opportunity?",
    receivedAt: "1d ago",
  },
  {
    initials: "MS",
    name: "Michael Smith",
    email: "michael@example.com",
    excerpt: "I have a job opportunity that might interest you.",
    receivedAt: "2d ago",
  },
  {
    initials: "ED",
    name: "Emily Davis",
    email: "emily@example.com",
    excerpt: "Love your work! How did you build the analytics dashboard?",
    receivedAt: "3d ago",
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
    icon: MailPlus,
  },
  {
    title: "Manage Certifications",
    description: "Add or manage your certifications",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    description: "Configure CMS preferences",
    icon: Settings,
  },
];
