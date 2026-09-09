"use client";

import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/lib/projects-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardAbout } from "../ui/CardAbout";

export function ProjectDetail({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.image.length) % project.image.length,
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getImagePosition = (index: number) => {
    if (index === currentImageIndex) return "translate-x-0 opacity-100 z-10";
    if (index < currentImageIndex) return "-translate-x-full opacity-0";
    return "translate-x-full opacity-0";
  };
  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto">
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

      {/* Gambar / Screenshot Project dengan Slideshow */}
      <Card className="p-2 mb-10 bg-card/30">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-gray-900">
          {project.image.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${getImagePosition(
                index,
              )}`}
            >
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}

          {/* Tombol Navigasi Kiri */}
          {project.image.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Tombol Navigasi Kanan */}
          {project.image.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Pagination Dots */}
          {project.image.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {project.image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
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
        <p className="text-justify text-text-secondary leading-relaxed pl-0 md:px-12">
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
        <div className="flex flex-wrap gap-3 pl-0 md:pl-12">
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
        <ul className="space-y-3 pl-10 md:pl-12">
          {project.learnings.map((learning, index) => (
            <li
              key={index}
              className="flex gap-3 items-center text-text-secondary"
            >
              <span className="text-primary mt-1">✓</span>
              <span className="text-justify pr-12">{learning}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
