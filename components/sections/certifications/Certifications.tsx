"use client";
import { useInView } from "@/hooks/useInView";
import CertificationCarousel from "./CertificationCarousel";

export default function Certifications() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="certifications"
      ref={ref}
      className={`transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-52"
      }`}
    >
      <CertificationCarousel />
    </section>
  );
}
