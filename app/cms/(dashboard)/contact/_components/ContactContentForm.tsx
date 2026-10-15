import { SaveChangesButton } from "@/components/form/SaveChangesButton";
import { SocialLinksField } from "@/components/form/SocialLinksField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { Card } from "@/components/ui/Card";
import type { ContactFormData } from "@/lib/data/contact-data";

type ContactContentFormProps = {
  formData: ContactFormData;
  onDescriptionChange: (value: string) => void;
  onSocialChange: (index: number, url: string) => void;
  onSave: () => void;
};

export function ContactContentForm({
  formData,
  onDescriptionChange,
  onSocialChange,
  onSave,
}: ContactContentFormProps) {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8 bg-card/60">
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

      <SaveChangesButton onClick={onSave} className="w-full rounded-lg!" />
    </Card>
  );
}
