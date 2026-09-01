import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap } from "lucide-react";
import { Card } from "../ui/Card";

// Data pendidikan formal
const educations = [
  {
    institution: "University of Brawijaya",
    degree: "Bachelor of Computer Science",
    period: "Aug 2020 – Jul 2024",
    gpa: "GPA: 3.80 / 4.00",
  },
  {
    institution: "SMA Negeri 4 Malang",
    degree: "Ilmu Pengetahuan Alam (Natural Science)",
    period: "Jul 2017 – Jun 2020",
    gpa: "GPA: 3.80 / 4.00",
  },
];

export default function Education() {
  return (
    // id="education" agar link /#education dari Navbar bisa scroll ke sini
    <section id="education">
      <Card className="p-6 mt-2">
        <SectionHeading title="Education" icon={<GraduationCap size={24} />} />

        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6"
            >
              <p className="text-text-secondary text-xs mb-1">{edu.period}</p>
              <h3 className="text-white font-semibold">{edu.institution}</h3>
              <p className="text-primary text-sm">{edu.degree}</p>
              <p className="text-text-secondary text-xs mt-1">{edu.gpa}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
