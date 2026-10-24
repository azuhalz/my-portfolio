import { EducationForm } from "./EducationForm";
import { useDialog } from "@/hooks/useDialog";
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
  const { notify } = useDialog();

  const handleSubmit = async () => {
    // endYear "Present" bukan angka, jadi tidak ikut diperiksa
    if (Number(formData.endYear) < Number(formData.startYear)) {
      await notify({
        tone: "warning",
        title: "Invalid year range",
        description: "End Year cannot be earlier than Start Year.",
      });
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
