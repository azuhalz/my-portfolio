import Hero from "@/components/sections/hero/Hero";
import { Card } from "@/components/ui/Card";
import { LivePreview } from "@/components/ui/LivePreview";
import type { HeroFormData } from "@/lib/data/hero-data";

type HeroLivePreviewProps = {
  data: HeroFormData;
};

export function HeroLivePreview({ data }: HeroLivePreviewProps) {
  return (
    <Card className="flex flex-col gap-4 p-6 bg-card/60 sticky top-6">
      <div className="flex items-center justify-between"></div>
      <LivePreview />
      <div className="relative rounded-xl border border-border/80 bg-background/90 p-4 md:p-6 overflow-hidden">
        <Hero data={data} />
      </div>
    </Card>
  );
}
