"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useResponsivePagination } from "@/hooks/useResponsivePagination";
import { certificationsData as certifications } from "@/lib/certifications-data";
import { CertificationCard } from "./CertificationCard";
import { useInView } from "@/hooks/useInView";

export default function Certifications() {
  const { ref, isVisible } = useInView();
  const {
    activePage,
    totalPages,
    pages: certificationPages,
    goToNextPage,
    goToPreviousPage,
    showNavigation,
  } = useResponsivePagination(certifications, {
    mobileCount: 1,
    desktopCount: 3,
  });

  return (
    // id="certifications" agar link /#certifications dari Navbar bisa scroll ke sini
    <section
      id="certifications"
      ref={ref}
      className={`transition-all duration-3000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
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
              onClick={goToPreviousPage}
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
                  // Menggunakan grid statis, isi array otomatis disesuaikan oleh hook
                  className="w-full shrink-0 gap-3 grid grid-cols-1 md:grid-cols-3"
                >
                  {page.map((cert) => (
                    <CertificationCard
                      key={cert.credentialUrl}
                      certification={cert}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {showNavigation && (
            <Button
              type="button"
              variant={activePage === totalPages - 1 ? "disabled" : "outline"}
              onClick={goToNextPage}
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
