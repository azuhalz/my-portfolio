export const emptyExperience = {
  title: "",
  organization: "",
  startDate: "",
  endDate: "",
  points: [""],
};

export type Experience = typeof emptyExperience & {
  id?: number;
};

export const experiencesData: Experience[] = [
  {
    title: "iOS Developer",
    organization: "Apple Developer Academy @ UC",
    startDate: "2025-03",
    endDate: "2025-12",
    points: [
      "Developed iOS applications using SwiftUI and Swift.",
      "Implemented MVVM architecture with clear separation of concerns.",
      "Managed the app submission process to the App Store.",
      "Collaborated in a challenge-based learning environment with Apple mentors and peers.",
    ],
  },
  {
    title: "Software Quality Assurance",
    organization: "PT. Telkom Indonesia",
    startDate: "2024-04",
    endDate: "2024-09",
    points: [
      "Manual testing, automation testing, API testing and performance testing.",
      "Reported bugs and defects accurately.",
      "Worked with Agile methods: Kanban, Scrum, etc.",
    ],
  },
  {
    title: "Mobile Development Student",
    organization:
      "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    startDate: "2023-02",
    endDate: "2023-07",
    points: [
      "Developed Android applications using Kotlin.",
      "Improved soft skills and English proficiency with professional mentors.",
    ],
  },
];

export type ExperienceFormLabels = {
  heading: string;
  titleLabel: string;
  titlePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  endDateLabel: string;
  pointPlaceholder: string;
  submitLabel: string;
};

export const workExperienceFormLabels: ExperienceFormLabels = {
  heading: "Experience Information",
  titleLabel: "Role",
  titlePlaceholder: "Tech Learner",
  companyLabel: "Company",
  companyPlaceholder: "Apple Developer Academy @ UC",
  endDateLabel: "End Date",
  pointPlaceholder: "Describe what you did...",
  submitLabel: "Create Experience",
};
