"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsData } from "@/lib/data/projects-data";
import { FolderKanban } from "lucide-react";
import { Card } from "../ui/Card";
import { ProjectGridCard } from "@/components/projects/ProjectGridCard";
import { useInView } from "@/hooks/useInView";

export default function Projects() {
  const projects = projectsData.slice(0, 4);
  const { ref, isVisible } = useInView();

  return (
    <section
      id="projects"
      ref={ref}
      className={`transition-all duration-5000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
      }`}
    >
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

        {/* 1. Versi Mobile: Hanya tampil 1 proyek pertama (hidden di md ke atas) */}
        <div className="block md:hidden pt-2 px-4">
          {projects.slice(0, 1).map((project) => (
            <ProjectGridCard key={project.slug} project={project} />
          ))}
        </div>

        {/* 2. Versi Desktop: Tampil 4 proyek (grid 2x2) (hidden di bawah md) */}
        <div className="hidden md:grid grid-cols-2 gap-4 pt-2 px-16">
          {projects.map((project) => (
            <ProjectGridCard key={project.slug} project={project} />
          ))}
        </div>
      </Card>
    </section>
  );
}
