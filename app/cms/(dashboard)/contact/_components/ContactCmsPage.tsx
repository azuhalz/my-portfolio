"use client";

import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { ContactContentForm } from "./ContactContentForm";
import { useFormFields } from "@/hooks/useFormFields";
import {
  initialContactFormData,
  type ContactFormData,
} from "@/lib/data/contact-data";
import { updateItemAt } from "@/lib/utils/array";

export function ContactCmsPage() {
  const { formData, handleFieldChange } = useFormFields<ContactFormData>(
    initialContactFormData,
  );

  const handleSocialChange = (index: number, url: string) => {
    handleFieldChange(
      "socials",
      updateItemAt(formData.socials, index, {
        ...formData.socials[index],
        url,
      }),
    );
  };

  const handleSave = () => {
    console.log("Saving Contact Data:", formData);
    alert("Perubahan Contact Section berhasil disimpan (simulasi)!");
  };

  return (
    <CmsPageContainer size="form">
      <ContactContentForm
        formData={formData}
        onDescriptionChange={(value) => handleFieldChange("description", value)}
        onSocialChange={handleSocialChange}
        onSave={handleSave}
      />
    </CmsPageContainer>
  );
}
