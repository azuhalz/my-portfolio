import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AboutMe() {
  return (
    // id="about" agar link /#about dari Navbar bisa scroll ke sini
    <section id="about" className="">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" />

        {/* Grid 2 kolom: kiri deskripsi, kanan info card */}
        <div className="grid grid-cols-2 gap-12">
          {/* =============================== */}
          {/* KOLOM KIRI: Paragraf Deskripsi  */}
          {/* =============================== */}
          <p className="text-text-secondary leading-relaxed">
            I am a Computer Science graduate with hands-on experience in
            front-end and mobile development, including building web
            applications using modern technologies and developing iOS
            applications with SwiftUI. I am passionate about creating
            user-friendly and high-performance experiences.
          </p>

          {/* =============================== */}
          {/* KOLOM KANAN: Grid Info Card      */}
          {/* =============================== */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <p className="text-primary text-xs mb-1">📍 Location</p>
              <p className="text-white text-sm font-medium">
                Malang, East Java
              </p>
            </Card>

            <Card>
              <p className="text-primary text-xs mb-1">📞 Phone</p>
              <p className="text-white text-sm font-medium">0853-3681-8465</p>
            </Card>

            <Card>
              <p className="text-primary text-xs mb-1">✉️ Email</p>
              <p className="text-white text-sm font-medium break-all">
                mfachmifusuzahalrahs@gmail.com
              </p>
            </Card>

            <Card>
              <p className="text-primary text-xs mb-1">💼 LinkedIn</p>
              <p className="text-white text-sm font-medium">
                linkedin.com/in/zuhalzz
              </p>
            </Card>

            {/* Card ini lebih lebar (col-span-2) */}
            <div className="col-span-2">
              <Card>
                <p className="text-primary text-xs mb-1">🐙 GitHub</p>
                <p className="text-white text-sm font-medium">
                  github.com/azuhalzz
                </p>
                <Badge className="mt-2">Open to Opportunities</Badge>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
