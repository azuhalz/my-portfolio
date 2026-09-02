import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

// Data sertifikasi ditulis langsung di sini
const certifications = [
  {
    name: "Learn to Build Back-End Applications for Beginners",
    issuer: "Dicoding Indonesia",
    date: "Issued Mar 2024 · Expires Mar 2027",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ02VQGRX65",
  },
  {
    name: "Learn to Build Web Applications with React",
    issuer: "Dicoding Indonesia",
    date: "Issued Nov 2023 · Expires Nov 2026",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVDQ0YQZN9",
  },
  {
    name: "Learn Front-End Web Development for Beginners",
    issuer: "Dicoding Indonesia",
    date: "Issued Nov 2023 · Expires Nov 2026",
    credentialUrl: "https://www.dicoding.com/certificates/GRX5QN002Z0M",
  },
  {
    name: "Learning JavaScript Programming Basics",
    issuer: "Dicoding Indonesia",
    date: "Issued Nov 2023 · Expires Nov 2026",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVDQNNJZN9",
  },
  {
    name: "Learning Web Programming Basics",
    issuer: "Dicoding Indonesia",
    date: "Issued Jan 2024 · Expires Jan 2027",
    credentialUrl: "https://www.dicoding.com/certificates/53XEYDJ9YPRN",
  },
  {
    name: "Learn Git Basics with GitHub",
    issuer: "Dicoding Indonesia",
    date: "Issued Mar 2023 · Expired Mar 2026",
    credentialUrl: "https://www.dicoding.com/certificates/MEPJK7E4JX3V",
  },
];

export default function Certifications() {
  return (
    // id="certifications" agar link /#certifications dari Navbar bisa scroll ke sini
    <section id="certifications">
      <Card className="p-6 mt-2">
        <SectionHeading title="Certifications" icon={<Award size={24} />} />

        {/* Grid 3 kolom untuk daftar sertifikasi */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {certifications.map((cert, index) => (
            <Card key={index} className="p-4 flex flex-col justify-between">
              {/* Nama & Info Sertifikasi */}
              <div>
                <p className="text-white text-lg font-semibold">{cert.name}</p>
                <p className="text-primary">{cert.issuer}</p>
                <p className="text-text-secondary">{cert.date}</p>
              </div>

              {/* Tombol Show Credential */}
              <Button
                variant="outline"
                href={cert.credentialUrl}
                className="mt-4"
                target="_blank"
              >
                Show credential ↗
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
