"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { BriefcaseBusiness } from "lucide-react";
import { Card } from "../ui/Card";
import { useInView } from "@/hooks/useInView";

import { experiencesData as experiences } from "@/lib/data/experience-data";
import { formatExperiencePeriod } from "@/lib/utils/format-experience-period";

export default function Experience() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="experience"
      ref={ref}
      className={`transition-all duration-2000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-52"
      }`}
    >
      <Card className="p-6 mt-2">
        <SectionHeading
          title="Work Experience"
          icon={<BriefcaseBusiness size={24} />}
        />

        <div className="relative pt-2">
          <div className="absolute left-5 top-4 bottom-43 md:bottom-21 w-px bg-border" />

          <div className="space-y-3 pl-10">
            {experiences.map((exp) => (
              <div
                key={`${exp.organization}-${exp.startDate}`}
                className="relative"
              >
                <div className="absolute -left-7 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h2 className="text-white font-semibold">{exp.title}</h2>

                  <p className="text-text-secondary text-sm shrink-0">
                    {formatExperiencePeriod(exp.startDate, exp.endDate)}
                  </p>
                </div>

                <p className="text-primary mb-1">{exp.organization}</p>

                <ul className="list-disc space-y-1 pl-4">
                  {exp.points.map((point) => (
                    <li key={point} className="text-text-secondary text-md">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
