import type { ExperienceFormLabels } from "@/lib/data/experience-data";

export type Organization = {
  role: string;
  organization: string;
  period: string;
  points: string[];
};

export const organizationsData: Organization[] = [
  {
    role: "Head of Basketball Division",
    organization: "Badan Internal Olahraga & Seni",
    period: "January – December 2022",
    points: [
      "Led basketball division, building a structured training system.",
      "Organized and supervised training sessions and events.",
      "Improved team communication and division organization.",
    ],
  },
  {
    role: "Basketball Division Staff",
    organization: "Badan Internal Olahraga & Seni",
    period: "January – December 2021",
    points: [
      "Assisted in organizing and managing basketball division activities.",
      "Supported event preparation and coordination on-site.",
    ],
  },
];

// Form CMS memakai ulang ExperienceFormData (struktur field-nya sama), hanya teksnya berbeda
export const organizationFormLabels: ExperienceFormLabels = {
  heading: "Add New Organizational Experience",
  titleLabel: "Position / Role",
  titlePlaceholder: "e.g., Head of Basketball Division",
  companyLabel: "Organization",
  companyPlaceholder: "e.g., Badan Internal Olahraga & Seni",
  endDateLabel: "End Date (or Expected)",
  pointPlaceholder: "Add description...",
  submitLabel: "Save Experience",
};
