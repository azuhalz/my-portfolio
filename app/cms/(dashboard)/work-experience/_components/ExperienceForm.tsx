import { BulletListField } from "@/components/form/BulletListField";
import { FormActions } from "@/components/form/FormActions";
import { TextInputField } from "@/components/form/TextInputField";
import { Card } from "@/components/ui/Card";
import type { ExperienceTextField } from "@/hooks/useExperienceForm";
import type { ExperienceFormData } from "@/lib/data/experience-data";

type ExperienceFormProps = {
  formData: ExperienceFormData;
  onFieldChange: (field: ExperienceTextField, value: string) => void;
  onPointChange: (index: number, value: string) => void;
  onAddPoint: () => void;
  onRemovePoint: (index: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ExperienceForm({
  formData,
  onFieldChange,
  onPointChange,
  onAddPoint,
  onRemovePoint,
  onSubmit,
  onCancel,
}: ExperienceFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Card className="flex flex-col gap-5 p-6 md:p-8 bg-card/60">
        <h3 className="text-lg font-semibold text-text-primary">
          Experience Information
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInputField
            label="Role"
            value={formData.title}
            onChange={(val) => onFieldChange("title", val)}
            placeholder="Tech Learner"
            required
          />
          <TextInputField
            label="Company"
            value={formData.company}
            onChange={(val) => onFieldChange("company", val)}
            placeholder="Apple Developer Academy @ UC"
            required
          />
          <TextInputField
            label="Start Date"
            type="month"
            value={formData.startDate}
            onChange={(val) => onFieldChange("startDate", val)}
            required
          />
          <TextInputField
            label="End Date"
            type="month"
            value={formData.endDate}
            onChange={(val) => onFieldChange("endDate", val)}
          />
        </div>

        <BulletListField
          label="Description"
          items={formData.points}
          onChange={onPointChange}
          onAdd={onAddPoint}
          onRemove={onRemovePoint}
          placeholder="Describe what you did..."
        />

        <FormActions submitLabel="Create Experience" onCancel={onCancel} />
      </Card>
    </form>
  );
}
