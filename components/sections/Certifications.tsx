"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

import { certificationsData as certifications } from "@/lib/certifications-data";

export default function Certifications() {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Deteksi layar: jika di bawah 768px (HP), jadikan 1 item per halaman.
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
      setActivePage(0); // Reset ke halaman 1 tiap kali ukuran layar berubah
    };

    handleResize(); // Jalankan sekali saat web dimuat
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(certifications.length / itemsPerPage);

  const certificationPages = Array.from(
    { length: totalPages },
    (_, pageIndex) =>
      certifications.slice(
        pageIndex * itemsPerPage,
        (pageIndex + 1) * itemsPerPage,
      ),
  );

  function showNextPage() {
    if (activePage < totalPages - 1) setActivePage(activePage + 1);
  }

  function showPreviousPage() {
    if (activePage > 0) setActivePage(activePage - 1);
  }

  const showNavigation = totalPages > 1;

  return (
    // id="certifications" agar link /#certifications dari Navbar bisa scroll ke sini
    <section id="certifications">
      <Card className="p-6 mt-2">
        <div className="flex items-center justify-between">
          <SectionHeading title="Certifications" icon={<Award size={24} />} />
        </div>

        {/* Satu halaman menampilkan item sesuai ukuran layar, lalu bergeser horizontal. */}
        <div className="flex items-center gap-3 pt-2">
          {showNavigation && (
            <Button
              type="button"
              variant={activePage === 0 ? "disabled" : "outline"}
              onClick={showPreviousPage}
              disabled={activePage === 0}
              aria-label="Previous certifications"
              className="shrink-0 p-2!"
            >
              <ChevronLeft size={20} />
            </Button>
          )}

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activePage * 100}%)` }}
            >
              {certificationPages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  // Menggunakan grid statis, isi array otomatis disesuaikan oleh useEffect
                  className="w-full shrink-0 gap-3 grid grid-cols-1 md:grid-cols-3"
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

          {showNavigation && (
            <Button
              type="button"
              variant={activePage === totalPages - 1 ? "disabled" : "outline"}
              onClick={showNextPage}
              disabled={activePage === totalPages - 1}
              aria-label="Next certifications"
              className="shrink-0 p-2!"
            >
              <ChevronRight size={20} />
            </Button>
          )}
        </div>
      </Card>
    </section>
  );
}
