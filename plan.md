# 📋 Next.js Portfolio Implementation Plan

> Website: zhafran.com (Ahmad Zuhal Zhafran — Portfolio)

---

## 🗺️ Peta Halaman & Navigasi

Website ini terdiri dari **3 halaman (Routes)** dengan perilaku navigasi yang berbeda:

| URL                | Halaman            | Keterangan                                                          |
| ------------------ | ------------------ | ------------------------------------------------------------------- |
| `/`                | **Home**           | Landing page lengkap, semua section ada di sini                     |
| `/projects`        | **All Projects**   | Daftar lengkap semua proyek dengan filter & search                  |
| `/projects/[slug]` | **Project Detail** | Halaman detail satu proyek (misal: `/projects/dashboard-analytics`) |

### Perilaku Navbar

- **Klik "About", "Experience", "Education", "Certifications", "Contact"** → Hanya **scroll ke bawah** ke section yang sesuai di halaman `/`. Ini menggunakan anchor link, misal `href="#about"`.
- **Klik "Projects"** → **Pindah halaman** ke `/projects`.
- **Navbar & Footer** selalu tampil di semua halaman karena diletakkan di `app/layout.tsx` (Root Layout).

---

## 🎨 1. Setup Palet Warna (Tailwind)

Berdasarkan desain, website menggunakan tema _dark mode_ dengan aksen warna ungu neon.
Tambahkan konfigurasi ini ke dalam file `tailwind.config.ts`:

**Mengapa perlu dilakukan?**
Agar kita tidak menulis warna hex berulang-ulang di setiap komponen. Cukup tulis `bg-card` atau `text-primary` di mana saja, dan jika ingin mengubah warna, cukup ubah di satu tempat ini saja.

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "#05050A", // Latar belakang utama (hitam pekat kebiruan)
        card: "#0F0F1A", // Latar belakang card/box
        border: "#1F1F2E", // Garis batas (outline pada card)
        primary: {
          DEFAULT: "#8B5CF6", // Ungu aksen utama (button, icon)
          hover: "#7C3AED", // Ungu gelap untuk efek hover
          glow: "rgba(139, 92, 246, 0.15)", // Efek shadow/glow ungu
        },
        text: {
          primary: "#FFFFFF", // Teks putih utama
          secondary: "#9CA3AF", // Teks abu-abu untuk deskripsi/subtitle
        },
      },
    },
  },
};
export default config;
```

---

## 📁 2. Struktur Folder & Komponen

**Mengapa perlu dilakukan?**
Di Next.js (App Router), setiap **folder di dalam `app/`** otomatis menjadi sebuah URL/halaman. File `app/layout.tsx` adalah "bingkai" yang membungkus semua halaman — Navbar dan Footer diletakkan di sini agar otomatis muncul di mana-mana tanpa ditulis ulang. Komponen dipecah ke folder `components/` agar kode rapi, mudah dicari, dan bisa dipakai berulang.

```text
my-portfolio/
│
├── app/                              # Folder inti Next.js (App Router)
│   ├── layout.tsx                    # ⭐ ROOT LAYOUT: Navbar & Footer diletakkan di sini
│   │                                 #    Otomatis membungkus SEMUA halaman
│   ├── globals.css                   # Styling global (background, font default)
│   │
│   ├── page.tsx                      # Halaman "/" (Home) — merakit semua sections
│   │
│   ├── projects/
│   │   ├── page.tsx                  # Halaman "/projects" — daftar semua proyek
│   │   └── [slug]/
│   │       └── page.tsx              # Halaman "/projects/[nama-proyek]" — detail proyek
│   │
│   └── not-found.tsx                 # (Opsional) Halaman 404
│
├── components/                       # Semua komponen UI
│   │
│   ├── layout/                       # Komponen "bingkai" yang muncul di semua halaman
│   │   ├── Navbar.tsx                # Navigasi (logo, link scroll, link pindah halaman)
│   │   └── Footer.tsx                # Footer (copyright, tombol back-to-top)
│   │
│   ├── sections/                     # Kepingan besar untuk halaman "/"
│   │   ├── Hero.tsx                  # id="home"   — Nama, foto, tombol CTA
│   │   ├── AboutMe.tsx               # id="about"  — Deskripsi & info kontak
│   │   ├── TechStack.tsx             # id="tech-stack" — Carousel logo teknologi
│   │   ├── Projects.tsx              # id="projects" — Preview 4 proyek di Home
│   │   ├── Experience.tsx            # id="experience" — Timeline work experience
│   │   ├── Education.tsx             # id="education" — Pendidikan & organisasi
│   │   ├── Certifications.tsx        # id="certifications" — Grid sertifikasi
│   │   └── Contact.tsx               # id="contact" — Form kontak
│   │
│   ├── projects/                     # Komponen khusus halaman /projects & /projects/[slug]
│   │   ├── ProjectCard.tsx           # Card satu proyek (gambar, judul, badge, tombol)
│   │   ├── ProjectFilter.tsx         # Tombol filter kategori (All, Web, Mobile, dll.)
│   │   ├── ProjectSearch.tsx         # Search bar & sort dropdown
│   │   └── ProjectDetail.tsx         # Konten lengkap halaman detail proyek
│   │
│   └── ui/                           # Komponen atom kecil yang dipakai di mana saja
│       ├── Button.tsx                # Tombol (dipakai di semua halaman)
│       ├── Badge.tsx                 # Label kecil tech (misal: "Next.js", "TypeScript")
│       ├── Card.tsx                  # Kotak/box dengan border dan background card
│       └── SectionHeading.tsx        # Judul section yang tampilannya konsisten
│
├── lib/                              # Logika & data (bukan komponen UI)
│   └── projects-data.ts              # Data semua proyek (slug, judul, deskripsi, tech, dll.)
│
└── public/                           # File statis
    ├── images/
    │   ├── profile.png               # Foto profil untuk Hero section
    │   └── projects/                 # Screenshot/thumbnail setiap proyek
    │       ├── dashboard-analytics.png
    │       ├── travel-explorer.png
    │       └── ...
    └── cv-zuhal.pdf                  # File CV untuk tombol "Download CV"
```

---

## ✅ 3. Checklist Tugas Berurutan (Execution Plan)

Kerjakan satu per satu secara berurutan. Ubah `[ ]` menjadi `[x]` jika tugas sudah selesai.

### 🏗️ Fase 1: Setup & Fondasi

- [x] **1.1** Update `tailwind.config.ts` dengan palet warna di atas.
- [x] **1.2** Bersihkan `app/globals.css`, set `background-color` global ke `#05050A`.
- [x] **1.3** Setup font utama di `app/layout.tsx`.
- [x] **1.4** Siapkan data proyek di `lib/projects-data.ts` (slug, judul, deskripsi, tech stack, gambar, link Live Demo & GitHub).
- [x] **1.5** Buat komponen `ui/`: Button, Badge, Card, SectionHeading.

### 🖼️ Fase 2: Layout Global (Navbar & Footer)

- [x] **2.1** Buat `components/layout/Navbar.tsx`:
  - Logo "AZZ." di kiri.
  - Link **scroll** (anchor): About, Experience, Education, Certifications, Contact → `href="#id-section"`.
  - Link **pindah halaman**: Projects → `href="/projects"`.
  - Tombol "Download CV" di kanan → `href="/cv-zuhal.pdf"`.
- [x] **2.2** Buat `components/layout/Footer.tsx` (copyright, tombol panah ke atas).
- [x] **2.3** Import Navbar & Footer ke dalam `app/layout.tsx`.

### 🏠 Fase 3: Halaman Home (`/`)

- [x] **3.1** Buat `Hero.tsx` — berikan `id="home"` pada section ini.
- [x] **3.2** Buat `AboutMe.tsx` — berikan `id="about"`.
- [x] **3.3** Buat `TechStack.tsx` — berikan `id="tech-stack"`.
- [x] **3.4** Buat `Projects.tsx` (preview 4 proyek) — berikan `id="projects"`. Tambahkan tombol "View All Projects →" yang mengarah ke `/projects`.
- [x] **3.5** Buat `Experience.tsx` — berikan `id="experience"`.
- [x] **3.6** Buat `Education.tsx` — berikan `id="education"`.
- [x] **3.7** Buat `Certifications.tsx` — berikan `id="certifications"`.
- [x] **3.8** Buat `Contact.tsx` — berikan `id="contact"`.
- [x] **3.9** Rakit semua section di `app/page.tsx`.

### 📂 Fase 4: Halaman All Projects (`/projects`)

- [x] **4.1** Buat `components/projects/ProjectCard.tsx`.
- [x] **4.2** Buat `components/projects/ProjectFilter.tsx`.
- [x] **4.3** Buat `components/projects/ProjectSearch.tsx`.
- [x] **4.4** Rakit semuanya di `app/projects/page.tsx`.

### 🔍 Fase 5: Halaman Detail Proyek (`/projects/[slug]`)

- [ ] **5.1** Buat `components/projects/ProjectDetail.tsx`.
- [ ] **5.2** Buat `app/projects/[slug]/page.tsx` — baca `slug` dari URL, cari data di `lib/projects-data.ts`, tampilkan `ProjectDetail.tsx`.

### ✨ Fase 6: Finalisasi & Responsiveness

- [ ] **6.1** Pastikan semua halaman tampil rapi di layar HP (mobile responsive).
- [ ] **6.2** Cek smooth scrolling saat link navbar diklik.
- [ ] **6.3** Cek navigasi antar halaman (Home ↔ All Projects ↔ Detail Proyek) berfungsi.
- [ ] **6.4** Pastikan tombol "Download CV" mengarah ke file `public/cv-zuhal.pdf`.
