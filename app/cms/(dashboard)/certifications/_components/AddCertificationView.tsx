import { CertificationForm } from "./CertificationForm";
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

  const handleSubmit = () => {
    if (formData.expiryDate && formData.expiryDate < formData.issuedDate) {
      alert("Expiration Date tidak boleh lebih awal dari Issued Date.");
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
