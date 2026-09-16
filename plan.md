# Plan: Transisi & Animasi Halaman Projects & Project Detail

## 1. Tujuan

Menambahkan transisi animasi masuk (enter animation) yang halus, jelas, dan interaktif ketika user membuka halaman **All Projects (`/projects`)** dan halaman **Project Detail (`/projects/[slug]`)**:

- Arah animasi bervariasi: **Atas, Bawah, Kiri, Kanan**.
- Durasi animasi: **3000ms (3 detik)** agar transisinya terlihat jelas dan elegan (`duration-[3000ms] ease-out`).
- Kode tetap sederhana, bersih (_clean code_), dan menggunakan Tailwind CSS serta native React hooks (`useInView` / `useState` + `useEffect`).

---

## 2. Rincian Animasi Halaman All Projects (`app/projects/page.tsx`)

Durasi: `duration-[3000ms] ease-out`

| Bagian Elemen                                                     | Arah Masuk                                                            | Class Awal (Hidden)                                                      | Class Akhir (Muncul)        |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------- |
| **Header Halaman** (`Portfolio`, judul `All Projects`, deskripsi) | Dari **Atas**                                                         | `opacity-0 -translate-y-12`                                              | `opacity-100 translate-y-0` |
| **Search & Filter Bar** (`ProjectSearch`, `ProjectFilter`)        | Dari **Kanan**                                                        | `opacity-0 translate-x-12`                                               | `opacity-100 translate-x-0` |
| **Project Cards List** (`ProjectCard`)                            | Bergantian **Kiri & Kanan** (Card genap dari Kiri, ganjil dari Kanan) | Genap: `opacity-0 -translate-x-12`<br>Ganjil: `opacity-0 translate-x-12` | `opacity-100 translate-x-0` |

### Mekanisme Implementasi di `app/projects/page.tsx`:

- Menggunakan state `isMounted` dengan `useEffect` untuk memicu animasi bagian atas saat halaman pertama kali dibuka:
  ```tsx
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  ```
- Setiap `ProjectCard` dibungkus container transisi (atau memanfaatkan `useInView` per item) dengan transisi `duration-[3000ms]`.

---

## 3. Rincian Animasi Halaman Project Detail (`components/projects/detail/ProjectDetail.tsx`)

Durasi: `duration-[3000ms] ease-out`

Setiap komponen detail proyek dianimasikan dari arah yang berbeda saat halaman dibuka / di-scroll:

| Komponen Detail          | Arah Masuk     | Class Awal (Hidden)         | Class Akhir (Muncul)        | Keterangan                                |
| ------------------------ | -------------- | --------------------------- | --------------------------- | ----------------------------------------- |
| **ProjectBreadcrumb**    | Dari **Atas**  | `opacity-0 -translate-y-10` | `opacity-100 translate-y-0` | Navigasi breadcrumb atas                  |
| **ProjectHeader**        | Dari **Kiri**  | `opacity-0 -translate-x-12` | `opacity-100 translate-x-0` | Judul proyek, link Demo & GitHub          |
| **ProjectInfoCards**     | Dari **Kanan** | `opacity-0 translate-x-12`  | `opacity-100 translate-x-0` | Kartu informasi timeline, peran, kategori |
| **ProjectImageCarousel** | Dari **Bawah** | `opacity-0 translate-y-12`  | `opacity-100 translate-y-0` | Gambar/carousel preview proyek            |
| **ProjectOverview**      | Dari **Kiri**  | `opacity-0 -translate-x-12` | `opacity-100 translate-x-0` | Penjelasan ringkasan proyek               |
| **ProjectTechStack**     | Dari **Kanan** | `opacity-0 translate-x-12`  | `opacity-100 translate-x-0` | Badge teknologi yang digunakan            |
| **ProjectLearnings**     | Dari **Bawah** | `opacity-0 translate-y-12`  | `opacity-100 translate-y-0` | Poin pembelajaran proyek                  |

### Mekanisme Implementasi di `ProjectDetail.tsx`:

- Mengubah `ProjectDetail.tsx` menjadi `"use client"` (atau membungkus masing-masing komponen dengan wrapper / `useInView`).
- Alternatif yang sangat bersih dan terstruktur adalah membuat komponen pembungkus animasi reusable atau menerapkan `useInView` / `isMounted` pada section detail:
  ```tsx
  <div
    className={`transition-all duration-3000 ease-out ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
    }`}
  >
    {/* Child Component */}
  </div>
  ```

---

## 4. File yang Akan Diubah (Untuk Dikerjakan Nanti)

1. **`app/projects/page.tsx`**
   - Menambahkan state mount / trigger animasi `duration-[3000ms]`.
   - Mengatur arah transisi header (atas), search & filter (kanan), dan card list (kiri/kanan bergantian).

2. **`components/projects/detail/ProjectDetail.tsx`**
   - Menambahkan client wrapper atau memetakan transisi arah berbeda (atas, kiri, kanan, bawah) dengan `duration-[3000ms]` untuk masing-masing 7 komponen detail.

---

## 5. Catatan & Batasan

- **Tanpa library tambahan**: Murni Tailwind CSS + hooks bawaan React / `useInView`.
- **Tidak merusak fungsionalitas**: Filter, search, carousel, pagination, dan navigasi detail tetap berfungsi normal.
