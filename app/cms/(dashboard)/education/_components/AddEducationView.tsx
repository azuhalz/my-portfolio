import { EducationForm } from "./EducationForm";
import { useFormFields } from "@/hooks/useFormFields";
import { emptyEducation, type Education } from "@/lib/data/education-data";

type AddEducationViewProps = {
  onSubmit: (formData: Education) => void;
  onCancel: () => void;
};

export function AddEducationView({
  onSubmit,
  onCancel,
}: AddEducationViewProps) {
  const { formData, handleFieldChange } =
    useFormFields<Education>(emptyEducation);

  const handleSubmit = () => {
    // endYear "Present" bukan angka, jadi tidak ikut diperiksa
    if (Number(formData.endYear) < Number(formData.startYear)) {
      alert("End Year tidak boleh lebih awal dari Start Year.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <EducationForm
      formData={formData}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
