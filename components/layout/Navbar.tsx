"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

// Kita kumpulkan semua menu di dalam array seperti yang Anda minta,
// supaya kode HTML-nya lebih bersih dan bisa memakai `.map()`.
const navLinks = [
  { name: "About", id: "about", href: "/#about" },
  { name: "Projects", id: "projects", href: "/projects" },
  { name: "Experience", id: "experience", href: "/#experience" },
  { name: "Education", id: "education", href: "/#education" },
  { name: "Certifications", id: "certifications", href: "/#certifications" },
  { name: "Contact", id: "contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");

  // Logic simpel untuk Scroll Spy (Mendeteksi kita sedang scroll di bagian mana)
  useEffect(() => {
    // Semua halaman Projects, termasuk detail `/projects/[slug]`, tidak memakai scroll spy.
    if (pathname.startsWith("/projects")) return;

    const handleScroll = () => {
      // Ambil nilai jarak scroll layar dari atas (scrollY)
      const scrollPosition = window.scrollY;

      // Jika masih di paling atas, otomatis aktifkan "about"
      if (scrollPosition < 100) {
        setActiveMenu("about");
        return;
      }

      // Jika sudah men-scroll mentok sampai paling bawah layar,
      // paksa menu "contact" yang menyala.
      // (Memecahkan masalah section contact yang terlalu pendek sehingga kalah dengan certification)
      if (
        window.innerHeight + Math.round(scrollPosition) >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveMenu("contact");
        return;
      }

      // Mengecek semua bagian menu satu persatu
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Cek apakah elemen ini sedang berada di tengah layar atau bagian atas layar (misal jaraknya 200px dari atas)
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveMenu(link.id);
          }
        }
      }
    };

    // Pasang alat pendeteksi scroll setiap kali user menggulir layar
    window.addEventListener("scroll", handleScroll);
    // Jalankan sekali saat website baru dirender
    handleScroll();

    // Hapus pendeteksi saat komponen Navbar tidak digunakan agar website tidak berat
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeLinkStyle =
    "bg-primary/30 text-white px-4 py-2 rounded-full transition-colors text-md";
  const inactiveLinkStyle =
    "text-text-secondary hover:text-white px-4 py-2 rounded-full transition-colors text-md";

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="mx-auto px-6 pt-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // Supaya kalau logo diklik, scroll pelan ke atas
          className="flex items-center text-3xl font-bold border border-primary rounded-4xl py-1.5 px-5"
        >
          AZZ<span className="text-primary">.</span>
        </Link>

        {/* MENU */}
        <div className="flex gap-2 items-center border border-primary rounded-4xl py-1.5 px-6">
          {navLinks.map((link) => {
            // 1. Jika kita sedang di halaman Projects atau detailnya, hanya menu Projects yang menyala.
            // 2. Jika kita di halaman utama "/", maka menu yang menyala murni mengikuti state activeMenu (scroll spy).
            const isActive = pathname.startsWith("/projects")
              ? link.id === "projects"
              : activeMenu === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  // Kalau kita lagi di halaman Home (bukan di /projects) dan yang diklik itu scroll link (ada #),
                  // kita gulir layarnya secara manual menggunakan javascript.
                  // Ini memecahkan bug "tombol About tidak bisa diklik" pas lagi di atas.
                  if (pathname === "/" && link.href.includes("#")) {
                    e.preventDefault();
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", link.href); // Update URL biar tetap bagus
                      setActiveMenu(link.id);
                    }
                  }
                }}
                className={isActive ? activeLinkStyle : inactiveLinkStyle}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* TOMBOL */}
        <div>
          <Button
            href="/CV_AhmadZuhalZhafran.pdf"
            variant="outline"
            target="_blank"
            rel="noreferrer"
          >
            <span>Download CV</span>
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
