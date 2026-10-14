import { Calendar } from "lucide-react";
import { CheckboxField } from "@/components/form/CheckboxField";
import { FormActions } from "@/components/form/FormActions";
import { SelectField } from "@/components/form/SelectField";
import { TextInputField } from "@/components/form/TextInputField";
import { Card } from "@/components/ui/Card";
import type { EducationFormState } from "@/hooks/useEducationForm";
import {
  educationLevelOptions,
  educationYearOptions,
} from "@/lib/data/education-data";

type EducationFormProps = {
  form: EducationFormState;
  onSubmit: () => void;
  onCancel: () => void;
};

export function EducationForm({
  form,
  onSubmit,
  onCancel,
}: EducationFormProps) {
  const { formData, handleFieldChange } = form;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Card className="flex flex-col gap-5 p-6 md:p-8 bg-card/60">
        <h3 className="text-lg font-semibold text-text-primary">
          Add New Education
        </h3>

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <TextInputField
            className="sm:col-span-2"
            label="Institution Name"
            value={formData.institution}
            onChange={(val) => handleFieldChange("institution", val)}
            placeholder="e.g., Universitas Brawijaya"
            required
          />

          <SelectField
            label="Degree / Level"
            options={educationLevelOptions}
            placeholder="Select degree / level"
            value={formData.level}
            onChange={(val) => handleFieldChange("level", val)}
            required
          />
          <TextInputField
            label="Field of Study"
            value={formData.fieldOfStudy}
            onChange={(val) => handleFieldChange("fieldOfStudy", val)}
            placeholder="e.g., Informatics Engineering"
            required
          />

          <SelectField
            label="Start Year"
            icon={<Calendar size={16} />}
            options={educationYearOptions}
            placeholder="Select start year"
            value={formData.startYear}
            onChange={(val) => handleFieldChange("startYear", val)}
            required
          />
          <div className="flex flex-col gap-2.5">
            <SelectField
              label="End Year (or Expected)"
              icon={<Calendar size={16} />}
              options={educationYearOptions}
              placeholder="Select end year"
              value={formData.endYear}
              onChange={(val) => handleFieldChange("endYear", val)}
              disabled={formData.isCurrentlyStudying}
              required={!formData.isCurrentlyStudying}
            />
            <CheckboxField
              label="Currently studying here"
              hint="Centang jika masih berkuliah atau bersekolah. Periode akan tampil sebagai Present."
              checked={formData.isCurrentlyStudying}
              onChange={(checked) =>
                handleFieldChange("isCurrentlyStudying", checked)
              }
            />
          </div>

          <TextInputField
            label="GPA (Optional)"
            value={formData.gpa}
            onChange={(val) => handleFieldChange("gpa", val)}
            placeholder="e.g., 3.75 / 4.00"
          />
        </div>

        <FormActions submitLabel="Save Education" onCancel={onCancel} />
      </Card>
    </form>
  );
}
