import { ExperienceForm } from "./ExperienceForm";
import { useExperienceForm } from "@/hooks/useExperienceForm";
import type {
  Experience,
  ExperienceFormLabels,
} from "@/lib/data/experience-data";

type AddExperienceViewProps = {
  labels: ExperienceFormLabels;
  onSubmit: (formData: Experience) => void;
  onCancel: () => void;
};

export function AddExperienceView({
  labels,
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

  const handleSubmit = () => {
    if (formData.endDate && formData.endDate < formData.startDate) {
      alert("End Date tidak boleh lebih awal dari Start Date.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <ExperienceForm
      formData={formData}
      labels={labels}
      onFieldChange={handleFieldChange}
      onPointChange={handlePointChange}
      onAddPoint={handleAddPoint}
      onRemovePoint={handleRemovePoint}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
