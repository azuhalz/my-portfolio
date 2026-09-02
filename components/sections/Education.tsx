import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap } from "lucide-react";
import { Card } from "../ui/Card";

// Data pendidikan formal
const educations = [
  {
    institution: "University of Brawijaya",
    degree: "Bachelor of Computer Science",
    period: "Aug 2020 – Jul 2024",
    gpa: "GPA: 3.60 / 4.00 (Cum Laude)",
  },
  {
    institution: "SMA Negeri 4 Malang",
    degree: "Natural Science",
    period: "Jul 2017 – Jun 2020",
    gpa: "",
  },
];

export default function Education() {
  return (
    // id="education" agar link /#education dari Navbar bisa scroll ke sini
    <section id="education">
      <Card className="p-6 mt-2">
        <SectionHeading title="Education" icon={<GraduationCap size={24} />} />

        <div className="space-y-2 pt-2">
          {educations.map((edu, index) => (
            <Card key={index} className="px-6 py-4 hover:border-primary">
              <div className="flex justify-between items-center">
                <h2 className="text-white font-semibold">{edu.institution}</h2>
                <p className="text-text-secondary text-sm">{edu.period}</p>
              </div>
              <p className="text-primary text-md">{edu.degree}</p>
              <p className="text-text-secondary text-sm mt-1">{edu.gpa}</p>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
