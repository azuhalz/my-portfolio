import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award } from "lucide-react";
import { Card } from "../ui/Card";

// Data sertifikasi ditulis langsung di sini
const certifications = [
  {
    name: "Apple Developer Academy @ UC Completion",
    issuer: "Apple",
    date: "Dec 2025",
    credentialUrl: "#",
  },
  {
    name: "Mobile Development Specialization",
    issuer: "Google – Provided by Google Tetramind",
    date: "Nov 2023",
    credentialUrl: "#",
  },
  {
    name: "AWS Academy Graduation",
    issuer: "AWS Academy",
    date: "Jun 2023",
    credentialUrl: "#",
  },
  {
    name: "Belajar Dasar Pengembangan Web",
    issuer: "Dicoding",
    date: "Sep 2023",
    credentialUrl: "#",
  },
  {
    name: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding",
    date: "Sep 2023",
    credentialUrl: "#",
  },
  {
    name: "Belajar Pemrograman dengan Python",
    issuer: "Dicoding",
    date: "Okt 2023",
    credentialUrl: "#",
  },
];

export default function Certifications() {
  return (
    // id="certifications" agar link /#certifications dari Navbar bisa scroll ke sini
    <section id="certifications">
      <Card className="p-6 mt-2">
        <SectionHeading title="Certifications" icon={<Award size={24} />} />

        {/* Grid 3 kolom untuk daftar sertifikasi */}
        <div className="grid grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3"
            >
              {/* Nama & Info Sertifikasi */}
              <div>
                <p className="text-white text-sm font-semibold">{cert.name}</p>
                <p className="text-primary text-xs mt-1">{cert.issuer}</p>
                <p className="text-text-secondary text-xs">{cert.date}</p>
              </div>

              {/* Tombol Show Credential */}
              <a
                href={cert.credentialUrl}
                target="_blank"
                className="text-xs text-center border border-border rounded-md py-1.5 hover:border-primary hover:text-primary transition-colors"
              >
                Show credential ↗
              </a>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
