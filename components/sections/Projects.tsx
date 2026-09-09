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
    <section id="projects">
      <Card className="p-6 mt-2">
        {/* Header: Judul di kiri, link "View All" di kanan */}
        <div className="flex items-center justify-between">
          <SectionHeading title="Projects" icon={<FolderKanban size={24} />} />
          <Link
            href="/projects"
            className="text-primary text-md hover:underline"
          >
            View All Projects →
          </Link>
        </div>

        {/* Di mobile: 1 kolom, di desktop: 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 px-16">
          {previewProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card className="h-full overflow-hidden hover:border-primary transition-colors group">
                {/* Gambar Thumbnail */}
                <div className="relative h-77.5 bg-border">
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.07]"
                  />
                </div>

                {/* Konten Teks */}
                <div className="p-4">
                  <h1 className="text-xl text-white font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h1>
                  <p className="text-justify text-text-secondary text-sm mt-1 line-clamp-3">
                    {project.overview}
                  </p>
                  {/* Hanya tampilkan 6 badge tech pertama */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
