"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap } from "lucide-react";
import { Card } from "../ui/Card";
import { useInView } from "@/hooks/useInView";

import { educationsData as educations } from "@/lib/data/education-data";

export default function Education() {
  const { ref, isVisible } = useInView();

  return (
    // id="education" agar link /#education dari Navbar bisa scroll ke sini
    <section
      id="education"
      ref={ref}
      className={`transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-52"
      }`}
    >
      <Card className="p-6 mt-2">
        <SectionHeading title="Education" icon={<GraduationCap size={24} />} />

        <div className="space-y-2 pt-2">
          {educations.map((edu) => (
            <Card
              key={edu.institution}
              className="px-6 py-4 hover:border-primary"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <h2 className="text-white font-semibold">{edu.institution}</h2>
                <p className="text-text-secondary text-sm shrink-0">
                  {edu.period}
                </p>
              </div>
              <p className="text-primary text-md">{edu.degree}</p>
              {edu.gpa && (
                <p className="text-text-secondary text-sm mt-1">{edu.gpa}</p>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
