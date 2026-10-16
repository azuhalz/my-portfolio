"use client";

import { useInView } from "@/hooks/useInView";
import { initialHeroData, type HeroFormData } from "@/lib/data/hero-data";
import { HeroContent } from "./HeroContent";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { HeroProfileImage } from "./HeroProfileImage";
import { HeroBackdrop } from "./HeroBackdrop";

export type HeroProps = {
  data?: HeroFormData;
};

export default function Hero({ data = initialHeroData }: HeroProps) {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="home"
      ref={ref}
      className={`relative flex items-center pt-10 pb-8 transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-52"
      }`}
    >
      <HeroBackdrop />
      <div className="relative z-10 mx-auto w-full flex flex-col-reverse gap-10 md:grid md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center text-center md:text-left">
          <HeroContent data={data} />
          <HeroSocialLinks socials={data.socials} />
        </div>
        <HeroProfileImage
          imageUrl={data.profileImageUrl}
          imageName={data.profileImageName}
        />
      </div>
    </section>
  );
}
