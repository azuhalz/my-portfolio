import { Calendar } from "lucide-react";
import { CheckboxField } from "@/components/form/CheckboxField";
import { FormActions } from "@/components/form/FormActions";
import { SelectField } from "@/components/form/SelectField";
import { TextInputField } from "@/components/form/TextInputField";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_ONGOING,
  educationLevelOptions,
  educationYearOptions,
  type Education,
} from "@/lib/data/education-data";

type EducationFormProps = {
  formData: Education;
  onFieldChange: (field: keyof Education, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function EducationForm({
  formData,
  onFieldChange,
  onSubmit,
  onCancel,
}: EducationFormProps) {
  const isCurrentlyStudying = formData.endYear === EDUCATION_ONGOING;

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
            onChange={(val) => onFieldChange("institution", val)}
            placeholder="e.g., Universitas Brawijaya"
            required
          />

          <SelectField
            label="Degree / Level"
            options={educationLevelOptions}
            placeholder="Select degree / level"
            value={formData.level}
            onChange={(val) => onFieldChange("level", val)}
            required
          />
          <TextInputField
            label="Field of Study"
            value={formData.fieldOfStudy}
            onChange={(val) => onFieldChange("fieldOfStudy", val)}
            placeholder="e.g., Informatics Engineering"
            required
          />

          <SelectField
            label="Start Year"
            icon={<Calendar size={16} />}
            options={educationYearOptions}
            placeholder="Select start year"
            value={formData.startYear}
            onChange={(val) => onFieldChange("startYear", val)}
            required
          />
          <div className="flex flex-col gap-2.5">
            <SelectField
              label="End Year (or Expected)"
              icon={<Calendar size={16} />}
              options={educationYearOptions}
              placeholder={isCurrentlyStudying ? "Present" : "Select end year"}
              value={isCurrentlyStudying ? "" : formData.endYear}
              onChange={(val) => onFieldChange("endYear", val)}
              disabled={isCurrentlyStudying}
              required={!isCurrentlyStudying}
            />
            <CheckboxField
              label="Currently studying here"
              hint="Centang jika masih berkuliah atau bersekolah. Periode akan tampil sebagai Present."
              checked={isCurrentlyStudying}
              onChange={(checked) =>
                onFieldChange("endYear", checked ? EDUCATION_ONGOING : "")
              }
            />
          </div>

          <TextInputField
            label="GPA (Optional)"
            value={formData.gpa}
            onChange={(val) => onFieldChange("gpa", val)}
            placeholder="e.g., 3.75 / 4.00"
          />
        </div>

        <FormActions submitLabel="Save Education" onCancel={onCancel} />
      </Card>
    </form>
  );
}
