export type Project = {
  slug: string;
  title: string;
  type: string;
  role: string;
  timeline: string;
  overview: string;
  techStack: string[];
  learnings: string[];
  image: string;
  category: string;
  liveDemoLink?: string;
  githubLink?: string;
};

export const projectsData: Project[] = [
  {
    slug: "dashboard-analytics",
    title: "Dashboard Analytics",
    type: "Web App",
    role: "Frontend Developer",
    timeline: "2025",
    overview:
      "A modern analytics dashboard with interactive charts, real-time data, and insightful KPIs to help businesses make data-driven decisions.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Node.js",
      "PostgreSQL",
    ],
    learnings: [
      "Deepened my understanding of data visualizations best practices and dashboard UX design.",
      "Improved performance optimization techniques for handling large datasets in web applications.",
      "Strengthened my skills in building scalable, maintainable frontend architectures with Next.js and TypeScript.",
      "Gained hands-on experience integrating real-time data streams and enhancing user interactivity.",
    ],
    image: "/images/projects/dashboard-analytics.png",
    category: "Dashboard",
    liveDemoLink: "https://github.com/azuhalz/my-portfolio",
    githubLink: "https://github.com/azuhalz/my-portfolio",
  },
  {
    slug: "travel-explorer-web",
    title: "Travel Explorer Web",
    type: "Web App",
    role: "Fullstack Developer",
    timeline: "2024",
    overview:
      "A travel discovery platform to explore beautiful destinations, plan trips, and book experiences around the world.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
    learnings: [
      "Learned how to implement secure payment gateways using Stripe.",
      "Mastered backend-as-a-service concepts using Supabase for authentication and database management.",
    ],
    image: "/images/projects/travel-explorer.png",
    category: "Travel",
  },
  {
    slug: "finance-tracker-app",
    title: "Finance Tracker App",
    type: "Mobile App",
    role: "Mobile Developer",
    timeline: "2024",
    overview:
      "Track income, expenses, and budgets with beautiful insights and reports. Stay on top of your finances with ease.",
    techStack: ["React Native", "TypeScript", "Recharts", "MMKV", "Expo"],
    learnings: [
      "Built a highly performant mobile application using React Native and Expo.",
      "Implemented fast local storage solutions using MMKV.",
    ],
    image: "/images/projects/finance-tracker.png",
    category: "Finance",
  },
  {
    slug: "e-commerce-website",
    title: "E-Commerce Website",
    type: "Web App",
    role: "Fullstack Developer",
    timeline: "2023",
    overview:
      "A modern and responsive e-commerce website with product browsing, cart, and secure checkout experience.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    learnings: [
      "Designed and developed a complete shopping cart experience.",
      "Modeled complex relational databases using Prisma ORM.",
    ],
    image: "/images/projects/e-commerce.png",
    category: "E-Commerce",
  },
];
