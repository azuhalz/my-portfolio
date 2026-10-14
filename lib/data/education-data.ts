export type Education = {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
};

export const educationsData: Education[] = [
  {
    institution: "University of Brawijaya",
    degree: "Bachelor of Computer Science",
    period: "August 2020 – July 2024",
    gpa: "GPA: 3.60 / 4.00 (Cum Laude)",
  },
  {
    institution: "SMA Negeri 4 Malang",
    degree: "Natural Science",
    period: "July 2017 – June 2020",
  },
];

// ===== Form CMS (Add/Edit Education) =====

export const educationLevelOptions = [
  "High School",
  "Diploma",
  "Bachelor",
  "Master",
  "Doctorate",
];

// Dari 6 tahun ke depan (untuk expected graduation) mundur 40 tahun
const YEAR_OPTIONS_COUNT = 40;
const latestYear = new Date().getFullYear() + 6;

export const educationYearOptions = Array.from(
  { length: YEAR_OPTIONS_COUNT },
  (_, index) => String(latestYear - index),
);

export type EducationFormData = {
  institution: string;
  level: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  isCurrentlyStudying: boolean;
  gpa: string; // contoh: "3.75 / 4.00"
};

export const initialEducationFormData: EducationFormData = {
  institution: "",
  level: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  isCurrentlyStudying: false,
  gpa: "",
};
