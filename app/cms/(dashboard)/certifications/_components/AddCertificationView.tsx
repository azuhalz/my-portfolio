import { CertificationForm } from "./CertificationForm";
import { useDialog } from "@/hooks/useDialog";
import { useFormFields } from "@/hooks/useFormFields";
import {
  emptyCertification,
  type Certification,
} from "@/lib/data/certifications-data";

type AddCertificationViewProps = {
  onSubmit: (formData: Certification) => void;
  onCancel: () => void;
};

export function AddCertificationView({
  onSubmit,
  onCancel,
}: AddCertificationViewProps) {
  const { formData, handleFieldChange } =
    useFormFields<Certification>(emptyCertification);
  const { notify } = useDialog();

  const handleSubmit = async () => {
    if (formData.expiryDate && formData.expiryDate < formData.issuedDate) {
      await notify({
        tone: "warning",
        title: "Invalid date range",
        description: "Expiration Date cannot be earlier than Issued Date.",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <CertificationForm
      formData={formData}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
