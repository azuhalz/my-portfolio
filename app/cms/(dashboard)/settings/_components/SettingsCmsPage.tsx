import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { Card } from "@/components/ui/Card";
import { ProfileSettingsSection } from "./ProfileSettingsSection";
import { PasswordSettingsSection } from "./PasswordSettingsSection";

export function SettingsCmsPage() {
  return (
    <CmsPageContainer size="form">
      <Card className="flex flex-col gap-8 p-6 md:p-8 bg-card/60">
        <ProfileSettingsSection />
        <div className="border-t border-border/60" />
        <PasswordSettingsSection />
      </Card>
    </CmsPageContainer>
  );
}
