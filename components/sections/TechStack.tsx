import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "../ui/Card";
import { Cpu } from "lucide-react";
import {
  SiGo,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

// Data tech stack ditulis langsung di sini sebagai array biasa
const techStack = [
  { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: "Golang", icon: <SiGo className="text-[#00ADD8]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
  { name: "SwiftUI", icon: <SiSwift className="text-[#F05138]" /> },
  { name: "Vue.js", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
];

export default function TechStack() {
  return (
    <section className="mt-2">
      <Card className="p-6">
        <SectionHeading
          title="My Skills & Tech Stack"
          icon={<Cpu size={24} />}
        />

        {/* Daftar ikon teknologi berjajar dan bisa wrap ke baris baru (flex-wrap) */}
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 w-32 hover:border-primary transition-colors"
            >
              <span className="text-5xl">{tech.icon}</span>
              <span className="text-text-secondary text-md text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
