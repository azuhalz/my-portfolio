import { notFound } from "next/navigation";
import { projectsData } from "@/lib/data/projects-data";
import { ProjectDetail } from "@/components/projects/detail/ProjectDetail";

// Next.js params types for dynamic routes
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Fungsi utama halaman untuk merender detail proyek berdasarkan slug
export default async function ProjectPage({ params }: Props) {
  // Tunggu params dari Next.js (wajib di Next.js versi 15+)
  const { slug } = await params;

  // Mencari proyek di dalam file projects-data.ts yang slug-nya sama dengan URL
  const project = projectsData.find((p) => p.slug === slug);

  // Jika proyek tidak ditemukan, arahkan ke halaman 404 (Not Found)
  if (!project) {
    notFound();
  }

  // Jika ditemukan, tampilkan komponen ProjectDetail dan berikan datanya
  return <ProjectDetail project={project} />;
}
