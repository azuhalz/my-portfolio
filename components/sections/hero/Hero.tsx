"use client";

import { useInView } from "@/hooks/useInView";
import { HeroContent } from "./HeroContent";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { HeroProfileImage } from "./HeroProfileImage";

export default function Hero() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="home"
      ref={ref}
      className={`flex items-center pt-10 pb-8 transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-52"
      }`}
    >
      <div className="mx-auto w-full flex flex-col-reverse gap-10 md:grid md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center text-center md:text-left">
          <HeroContent />
          <HeroSocialLinks />
        </div>
        <HeroProfileImage />
      </div>
    </section>
  );
}
