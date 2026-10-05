"use client";

import { FaEnvelope } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "../../ui/Card";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { useInView } from "@/hooks/useInView";

export default function Contact() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="contact"
      ref={ref}
      className={`transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-52"
      }`}
    >
      <Card className="p-6 mt-2">
        <SectionHeading title="Contact Me" icon={<FaEnvelope size={24} />} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </Card>
    </section>
  );
}
