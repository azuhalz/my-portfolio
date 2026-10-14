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

// Tipe form data untuk CMS Work Experience (Add/Edit)
export type ExperienceFormData = {
  title: string;
  company: string;
  startDate: string; // format "YYYY-MM" dari input type="month"
  endDate: string; // kosong = masih berjalan ("Present")
  points: string[];
};

export const initialExperienceFormData: ExperienceFormData = {
  title: "",
  company: "",
  startDate: "",
  endDate: "",
  points: [""],
};

// Teks form yang bisa dipakai ulang oleh Work Experience & Organizational Experience
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
