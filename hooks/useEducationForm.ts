import { useFormFields } from "@/hooks/useFormFields";
import {
  initialEducationFormData,
  type EducationFormData,
} from "@/lib/data/education-data";

export type EducationFormState = ReturnType<typeof useEducationForm>;

export function useEducationForm(
  initialData: EducationFormData = initialEducationFormData,
) {
  return useFormFields<EducationFormData>(initialData);
}
