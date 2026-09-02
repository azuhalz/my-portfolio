"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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
  const [activePage, setActivePage] = useState(0);
  const certificationsPerPage = 3;
  const totalPages = Math.ceil(certifications.length / certificationsPerPage);
  const certificationPages = Array.from(
    { length: totalPages },
    (_, pageIndex) =>
      certifications.slice(
        pageIndex * certificationsPerPage,
        (pageIndex + 1) * certificationsPerPage,
      ),
  );

  function showNextPage() {
    setActivePage((currentPage) => (currentPage + 1) % totalPages);
  }

  function showPreviousPage() {
    setActivePage((currentPage) => (currentPage - 1 + totalPages) % totalPages);
  }

  return (
    // id="certifications" agar link /#certifications dari Navbar bisa scroll ke sini
    <section id="certifications">
      <Card className="p-6 mt-2">
        <div className="flex items-center justify-between">
          <SectionHeading title="Certifications" icon={<Award size={24} />} />
        </div>

        {/* Satu halaman menampilkan tiga kartu, lalu bergeser horizontal. */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={showPreviousPage}
            aria-label="Previous certifications"
            className="shrink-0 p-2!"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activePage * 100}%)` }}
            >
              {certificationPages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 grid-cols-3 gap-2"
                >
                  {page.map((cert) => (
                    <Card
                      key={cert.credentialUrl}
                      className="p-4 flex flex-col justify-between"
                    >
                      {/* Nama & Info Sertifikasi */}
                      <div>
                        <p className="text-white text-lg font-semibold">
                          {cert.name}
                        </p>
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
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={showNextPage}
            aria-label="Next certifications"
            className="shrink-0 p-2!"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </Card>
    </section>
  );
}
