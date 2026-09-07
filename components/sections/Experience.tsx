import { SectionHeading } from "@/components/ui/SectionHeading";
import { BriefcaseBusiness } from "lucide-react";
import { Card } from "../ui/Card";

// Data pengalaman kerja ditulis langsung di sini
const experiences = [
  {
    title: "iOS Developer",
    company: "Apple Developer Academy @ UC",
    period: "Mar 2025 – Dec 2025",
    points: [
      "Developed iOS applications using SwiftUI and Swift.",
      "Implemented MVVM architecture with clear separation of concerns.",
      "Managed the app submission process to the App Store.",
      "Collaborated in a challenge-based learning environment with Apple mentors and peers.",
    ],
  },
  {
    title: "Software Quality Assurance",
    company: "PT. Telkom Indonesia",
    period: "Apr 2024 – Sep 2024",
    points: [
      "Manual testing, automation testing, API testing and performance testing.",
      "Reported bugs and defects accurately.",
      "Worked with Agile methods: Kanban, Scrum, etc.",
    ],
  },
  {
    title: "Mobile Development Student",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Feb 2023 – Jul 2023",
    points: [
      "Developed Android applications using Kotlin.",
      "Improved soft skills and English proficiency with professional mentors.",
    ],
  },
];

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
          <div className="absolute left-5 top-4 bottom-21 w-px bg-border" />

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
