import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projectsData } from "@/lib/projects-data";
import { FolderKanban } from "lucide-react";
import { Card } from "../ui/Card";

// Ambil hanya 4 proyek pertama untuk ditampilkan di Home
const previewProjects = projectsData.slice(0, 4);

export default function Projects() {
  return (
    <section>
      <Card className="p-6 mt-2">
        {/* Header: Judul di kiri, link "View All" di kanan */}
        <div className="flex items-center justify-between">
          <SectionHeading title="Projects" icon={<FolderKanban size={24} />} />
          <Link
            href="/projects"
            className="text-primary text-sm hover:underline"
          >
            View All Projects →
          </Link>
        </div>

        {/* Grid 2 kolom untuk menampilkan 4 project card */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          {previewProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors group">
                {/* Gambar Thumbnail */}
                <div className="relative h-48 bg-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Konten Teks */}
                <div className="p-4">
                  <h3 className="text-white font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                    {project.overview}
                  </p>
                  {/* Hanya tampilkan 3 badge tech pertama */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
