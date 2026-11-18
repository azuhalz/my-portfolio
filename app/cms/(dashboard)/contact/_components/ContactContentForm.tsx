import { SaveChangesButton } from "@/components/form/SaveChangesButton";
import { SocialLinksField } from "@/components/form/SocialLinksField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { PdfUploadField } from "@/components/form/PdfUploadField";
import { Card } from "@/components/ui/Card";
import type { ContactContent } from "@/lib/data/contact-data";

type ContactContentFormProps = {
  formData: ContactContent;
  cvFile: File | null;
  onDescriptionChange: (value: string) => void;
  onSocialChange: (index: number, url: string) => void;
  onCvChange: (file: File | null) => void;
  onSave: () => void;
};

export function ContactContentForm({
  formData,
  cvFile,
  onDescriptionChange,
  onSocialChange,
  onCvChange,
  onSave,
}: ContactContentFormProps) {
  return (
    <Card className="flex flex-col gap-6 bg-card/60 p-6 md:p-8">
      <TextAreaField
        label="Message Content"
        value={formData.description}
        onChange={onDescriptionChange}
        placeholder="Write a short message for your visitors..."
        rows={6}
      />

      <SocialLinksField
        variant="boxed"
        socials={formData.socials}
        onChange={onSocialChange}
      />

      <PdfUploadField
        label="Curriculum Vitae"
        file={cvFile}
        onChange={onCvChange}
        maxSizeMB={10}
      />

      <SaveChangesButton onClick={onSave} className="w-full rounded-lg!" />
    </Card>
  );
}
