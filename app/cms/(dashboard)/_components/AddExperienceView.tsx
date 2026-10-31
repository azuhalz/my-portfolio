import { ExperienceForm } from "./ExperienceForm";
import { useDialog } from "@/hooks/useDialog";
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
  const { notify } = useDialog();

  const handleSubmit = async () => {
    if (formData.endDate && formData.endDate < formData.startDate) {
      await notify({
        tone: "warning",
        title: "Invalid date range",
        description: "End Date cannot be earlier than Start Date.",
      });
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
