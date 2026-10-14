import { ExperienceForm } from "./ExperienceForm";
import { useExperienceForm } from "@/hooks/useExperienceForm";
import type { ExperienceFormData } from "@/lib/data/experience-data";

type AddExperienceViewProps = {
  onSubmit: (formData: ExperienceFormData) => void;
  onCancel: () => void;
};

export function AddExperienceView({
  onSubmit,
  onCancel,
}: AddExperienceViewProps) {
  const {
    formData,
    handleFieldChange,
    handlePointChange,
    handleAddPoint,
    handleRemovePoint,
  } = useExperienceForm();

  return (
    <ExperienceForm
      formData={formData}
      onFieldChange={handleFieldChange}
      onPointChange={handlePointChange}
      onAddPoint={handleAddPoint}
      onRemovePoint={handleRemovePoint}
      onSubmit={() => onSubmit(formData)}
      onCancel={onCancel}
    />
  );
}
