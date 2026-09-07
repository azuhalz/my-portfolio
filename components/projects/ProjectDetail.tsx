import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  LayoutGrid,
  User,
  Calendar,
  FileText,
  Code2,
  BookOpen,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/lib/projects-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardAbout } from "../ui/CardAbout";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen py-16 max-w-7xl mx-auto">
      {/* Breadcrumb sederhana: Portfolio / Nama Project */}
      <div className="flex gap-2 text-sm text-text-secondary mb-6">
        <Link href="/projects" className="hover:text-primary transition-colors">
          Portfolio
        </Link>
        <span>/</span>
        <span className="text-primary">{project.title}</span>
      </div>

      {/* Judul Project */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        {project.title}
      </h1>

      {/* Tombol-tombol: Live Demo, GitHub, Back */}
      <div className="flex flex-wrap gap-4 mb-10">
        {project.liveDemoLink && (
          <Button href={project.liveDemoLink} variant="primary" target="_blank">
            Live Demo <ExternalLink size={18} />
          </Button>
        )}

        {project.githubLink && (
          <Button href={project.githubLink} variant="outline" target="_blank">
            GitHub <FaGithub size={18} />
          </Button>
        )}

        <Button href="/projects" variant="outline">
          <ArrowLeft size={18} /> Back to Projects
        </Button>
      </div>

      {/* Tiga Kartu Info Singkat (Type, Role, Timeline) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <CardAbout
          icon={<LayoutGrid size={24} />}
          title="Project Type"
          value={project.type}
        />

        <CardAbout
          icon={<User size={24} />}
          title="Role"
          value={project.role}
        />

        <CardAbout
          icon={<Calendar size={24} />}
          title="Timeline"
          value={project.timeline}
        />
      </div>

      {/* Gambar / Screenshot Project */}
      <Card className="p-2 mb-10 bg-card/30">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </Card>

      {/* Bagian: Project Overview */}
      <Card className="p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <FileText size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Project Overview</h2>
        </div>
        <p className="text-justify text-text-secondary leading-relaxed px-12">
          {project.overview}
        </p>
      </Card>

      {/* Bagian: Tech Stack */}
      <Card className="p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Code2 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3 px-12">
          {project.techStack.map((tech, index) => (
            <Badge key={index} className="px-4 py-2 text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Bagian: What I Learned */}
      <Card className="p-6 md:p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">What I Learned</h2>
        </div>
        <ul className="space-y-3 px-12">
          {project.learnings.map((learning, index) => (
            <li
              key={index}
              className="flex gap-3 items-center text-text-secondary"
            >
              <span className="text-primary mt-1">✓</span>
              <span className="text-justify">{learning}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
