// Satu-satunya definisi bentuk data pendidikan: nilai kosong ini juga dipakai
// sebagai nilai awal form, dan type Education diturunkan darinya.
export const emptyEducation = {
  institution: "",
  level: "", // salah satu dari educationLevelOptions
  fieldOfStudy: "",
  startYear: "",
  endYear: "", // tahun lulus/perkiraan lulus, atau EDUCATION_ONGOING jika masih berjalan
  gpa: "", // contoh: "3.75 / 4.00", kosong = tidak ada
};

export type Education = typeof emptyEducation;

// Nilai endYear untuk pendidikan yang masih berjalan
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
