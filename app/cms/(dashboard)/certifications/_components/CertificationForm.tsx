import { FormActions } from "@/components/form/FormActions";
import { TextInputField } from "@/components/form/TextInputField";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/lib/data/certifications-data";

type CertificationFormProps = {
  formData: Certification;
  onFieldChange: (field: keyof Certification, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function CertificationForm({
  formData,
  onFieldChange,
  onSubmit,
  onCancel,
}: CertificationFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Card className="flex flex-col gap-5 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-text-primary">
          Certification Information
        </h3>

        <TextInputField
          label="Certificate Title"
          value={formData.name}
          onChange={(val) => onFieldChange("name", val)}
          placeholder="e.g., Learn to Build Web Applications with React"
          required
        />
        <TextInputField
          label="Issuer"
          value={formData.issuer}
          onChange={(val) => onFieldChange("issuer", val)}
          placeholder="e.g., Dicoding Indonesia"
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInputField
            label="Issued Date"
            type="month"
            value={formData.issuedDate}
            onChange={(val) => onFieldChange("issuedDate", val)}
            required
          />
          <TextInputField
            label="Expiration Date (Optional)"
            type="month"
            value={formData.expiryDate ?? ""}
            onChange={(val) => onFieldChange("expiryDate", val)}
          />
        </div>

        <TextInputField
          label="Credential URL"
          type="url"
          value={formData.credentialUrl}
          onChange={(val) => onFieldChange("credentialUrl", val)}
          placeholder="https://www.dicoding.com/certificates/..."
          required
        />

        <FormActions submitLabel="Create Certification" onCancel={onCancel} />
      </Card>
    </form>
  );
}
