import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/projects-data";

export function ProjectGridCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="h-full overflow-hidden hover:border-primary transition-colors group">
        {/* Gambar Thumbnail */}
        <div className="relative h-50 md:h-77.5 bg-border">
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
          {/* Badge Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
