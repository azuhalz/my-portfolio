"use client";

import { initialHeroData, type HeroFormData } from "@/lib/data/hero-data";
import { Button } from "@/components/ui/Button";

type HeroContentProps = {
  data?: Pick<
    HeroFormData,
    "greetingText" | "displayName" | "headline" | "workButton" | "contactButton"
  >;
};

export function HeroContent({ data = initialHeroData }: HeroContentProps) {
  return (
    <div className="flex flex-col justify-center text-center md:text-left">
      <p className="text-primary text-xl font-medium mb-2">
        {data.greetingText}
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
        {data.displayName}
        <span className="text-primary">.</span>
      </h1>
      <p className="text-primary text-xl sm:text-2xl mt-2">{data.headline}</p>
      <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-4 justify-center md:justify-start">
        <Button
          href="/projects"
          variant="primary"
          className="whitespace-nowrap"
        >
          {data.workButton}
        </Button>

        <Button
          href="/#contact"
          variant="outline"
          className="whitespace-nowrap"
        >
          {data.contactButton}
        </Button>
      </div>
    </div>
  );
}
