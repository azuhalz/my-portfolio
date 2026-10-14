import { EducationForm } from "./EducationForm";
import { useEducationForm } from "@/hooks/useEducationForm";
import type { EducationFormData } from "@/lib/data/education-data";

type AddEducationViewProps = {
  onSubmit: (formData: EducationFormData) => void;
  onCancel: () => void;
};

export function AddEducationView({
  onSubmit,
  onCancel,
}: AddEducationViewProps) {
  const form = useEducationForm();

  return (
    <EducationForm
      form={form}
      onSubmit={() => onSubmit(form.formData)}
      onCancel={onCancel}
    />
  );
}
