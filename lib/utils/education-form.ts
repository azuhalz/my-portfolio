import type { Education, EducationFormData } from "@/lib/data/education-data";

// Jenjang yang di data hanya ditulis nama jurusannya, contoh: "Natural Science"
const LEVELS_WITHOUT_PREFIX = ["High School"];

// "Bachelor" + "Computer Science" -> "Bachelor of Computer Science"
function formatDegree(level: string, fieldOfStudy: string): string {
  const field = fieldOfStudy.trim();
  return LEVELS_WITHOUT_PREFIX.includes(level) ? field : `${level} of ${field}`;
}

// Mengubah data form menjadi Education yang siap ditampilkan di daftar CMS.
export function createEducationFromForm(
  formData: EducationFormData,
): Education {
  const endYear = formData.isCurrentlyStudying ? "Present" : formData.endYear;
  const gpa = formData.gpa.trim();

  return {
    institution: formData.institution.trim(),
    degree: formatDegree(formData.level, formData.fieldOfStudy),
    period: `${formData.startYear} – ${endYear}`,
    gpa: gpa ? `GPA: ${gpa}` : undefined,
  };
}
