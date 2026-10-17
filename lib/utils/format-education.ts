import type { Education } from "@/lib/data/education-data";

// Jenjang yang ditulis hanya nama jurusannya, contoh: "Natural Science"
const LEVELS_WITHOUT_PREFIX = ["High School"];

// "Bachelor" + "Computer Science" -> "Bachelor of Computer Science"
export function formatEducationDegree({
  level,
  fieldOfStudy,
}: Pick<Education, "level" | "fieldOfStudy">): string {
  return LEVELS_WITHOUT_PREFIX.includes(level)
    ? fieldOfStudy
    : `${level} of ${fieldOfStudy}`;
}

// "2020" + "2024" -> "2020 – 2024" (endYear bisa berisi "Present")
export function formatEducationPeriod({
  startYear,
  endYear,
}: Pick<Education, "startYear" | "endYear">): string {
  return `${startYear} – ${endYear}`;
}

// "3.60 / 4.00" -> "GPA: 3.60 / 4.00"
export function formatEducationGpa(gpa: string): string {
  return `GPA: ${gpa}`;
}
