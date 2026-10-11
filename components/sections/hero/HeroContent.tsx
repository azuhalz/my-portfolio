"use client";

import { Button } from "@/components/ui/Button";

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center text-center md:text-left">
      <p className="text-primary text-xl font-medium mb-2">Hi, I&apos;m </p>
      <h1 className="text-5xl md:text-7xl font-bold text-white">
        Zhafran<span className="text-primary">.</span>
      </h1>
      <p className="text-primary text-xl md:text-2xl mt-2">
        Fullstack Developer
      </p>
      <div className="flex gap-4 mt-4 justify-center md:justify-start">
        <Button href="/projects" variant="primary">
          View My Work ↗
        </Button>

        <Button href="/#contact" variant="outline">
          Contact Me ↗
        </Button>
      </div>
    </div>
  );
}
