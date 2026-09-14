import { SectionHeading } from "@/components/ui/SectionHeading";
import { BriefcaseBusiness } from "lucide-react";
import { Card } from "../ui/Card";

import { experiencesData as experiences } from "@/lib/experience-data";

export default function Experience() {
  return (
    // id="experience" agar link /#experience dari Navbar bisa scroll ke sini
    <section id="experience">
      <Card className="p-6 mt-2">
        <SectionHeading
          title="Work Experience"
          icon={<BriefcaseBusiness size={24} />}
        />

        {/* Container timeline: posisi relative agar garis vertikal bisa diletakkan di dalamnya */}
        <div className="relative pt-2">
          {/* Garis vertikal ungu di kiri */}
          <div className="absolute left-5 top-4 bottom-43 md:bottom-21 w-px bg-border" />

          {/* Daftar pengalaman, diberi jarak ke kiri agar tidak tertimpa garis */}
          <div className="space-y-3 pl-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Titik bulat ungu di garis vertikal */}
                <div className="absolute -left-7 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                {/* Di mobile: judul dan periode menumpuk, di desktop: sejajar kiri-kanan */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h2 className="text-white font-semibold">{exp.title}</h2>
                  <p className="text-text-secondary text-sm shrink-0">
                    {exp.period}
                  </p>
                </div>
                <p className="text-primary mb-1">{exp.company}</p>

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
