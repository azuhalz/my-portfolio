import { useState } from "react";
import {
  initialEducationFormData,
  type EducationFormData,
} from "@/lib/data/education-data";

export type EducationFormState = ReturnType<typeof useEducationForm>;

export function useEducationForm(
  initialData: EducationFormData = initialEducationFormData,
) {
  const [formData, setFormData] = useState<EducationFormData>(initialData);

  const handleFieldChange = <K extends keyof EducationFormData>(
    field: K,
    value: EducationFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, handleFieldChange };
}
