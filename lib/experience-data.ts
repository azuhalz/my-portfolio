export type Experience = {
  title: string;
  company: string;
  period: string;
  points: string[];
};

export const experiencesData: Experience[] = [
  {
    title: "iOS Developer",
    company: "Apple Developer Academy @ UC",
    period: "March – December 2025",
    points: [
      "Developed iOS applications using SwiftUI and Swift.",
      "Implemented MVVM architecture with clear separation of concerns.",
      "Managed the app submission process to the App Store.",
      "Collaborated in a challenge-based learning environment with Apple mentors and peers.",
    ],
  },
  {
    title: "Software Quality Assurance",
    company: "PT. Telkom Indonesia",
    period: "April – September 2024",
    points: [
      "Manual testing, automation testing, API testing and performance testing.",
      "Reported bugs and defects accurately.",
      "Worked with Agile methods: Kanban, Scrum, etc.",
    ],
  },
  {
    title: "Mobile Development Student",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    period: "February – July 2023",
    points: [
      "Developed Android applications using Kotlin.",
      "Improved soft skills and English proficiency with professional mentors.",
    ],
  },
];
