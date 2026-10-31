export const emptyEducation = {
  institution: "",
  level: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  gpa: "",
};

export type Education = typeof emptyEducation;

export const EDUCATION_ONGOING = "Present";

export const educationsData: Education[] = [
  {
    institution: "University of Brawijaya",
    level: "Bachelor",
    fieldOfStudy: "Computer Science",
    startYear: "2020",
    endYear: "2024",
    gpa: "3.60 / 4.00 (Cum Laude)",
  },
  {
    institution: "SMA Negeri 4 Malang",
    level: "High School",
    fieldOfStudy: "Natural Science",
    startYear: "2017",
    endYear: "2020",
    gpa: "",
  },
];

// ===== Pilihan pada form CMS (Add/Edit Education) =====

export const educationLevelOptions = [
  "High School",
  "Diploma",
  "Bachelor",
  "Master",
];

// Dari 6 tahun ke depan (untuk expected graduation) mundur 40 tahun
const YEAR_OPTIONS_COUNT = 40;
const latestYear = new Date().getFullYear() + 6;

export const educationYearOptions = Array.from(
  { length: YEAR_OPTIONS_COUNT },
  (_, index) => String(latestYear - index),
);
