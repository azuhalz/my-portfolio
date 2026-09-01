import { SectionHeading } from "@/components/ui/SectionHeading";

// Data tech stack ditulis langsung di sini sebagai array biasa
const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "N" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Golang", icon: "🐹" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "Vue.js", icon: "V" },
  { name: "SwiftUI", icon: "🍎" },
];

export default function TechStack() {
  return (
    // id="tech-stack" agar link /#tech-stack dari Navbar bisa scroll ke sini
    <section id="tech-stack" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Tech Stack" />

        {/* Daftar ikon teknologi berjajar dan bisa wrap ke baris baru (flex-wrap) */}
        <div className="flex flex-wrap gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 w-24 hover:border-primary transition-colors"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-text-secondary text-xs text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
