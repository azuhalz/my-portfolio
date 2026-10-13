# Plan: Responsive Fixes — Hero, About Me, ProjectListItem

Target breakpoint yang diperbaiki: **`sm` (640px–767px)** — ukuran layar antara tablet kecil dan laptop, bukan HP, bukan desktop penuh. Di HP (`< 640px`) sudah oke; di laptop besar (`md` ke atas, `≥ 768px`) sudah oke.

---

## Step 1 — Hero Section

**File yang diubah:** `components/sections/hero/HeroContent.tsx` dan `components/sections/hero/HeroProfileImage.tsx`

### Masalah
- Judul `text-5xl` terlalu besar sehingga mendorong layout saat layar antara `sm`–`md`.
- Tombol "View My Work" dan "Contact Me" jatuh ke bawah sendiri-sendiri (tidak sejajar dalam satu baris) karena `flex-wrap` aktif tapi tombol terlalu lebar.
- Gambar profil terlalu besar (`md:w-96 md:h-96`) tapi breakpoint `md` baru aktif di `768px`, jadi di `sm` gambarnya masih kecil (`w-56 h-56`) tapi teks dan tombol sudah besar.

### Solusi

**`HeroContent.tsx`:**
- Tambah `sm:text-6xl` di antara `text-5xl` dan `md:text-7xl` → `text-5xl sm:text-6xl md:text-7xl`
- Tambah `sm:text-2xl` untuk headline → `text-xl sm:text-2xl`
- Pastikan container button pakai `flex-wrap gap-4` yang sudah ada — tambahkan `sm:flex-nowrap` sehingga di `sm` ke atas tombol tetap sejajar dalam satu baris

**`HeroProfileImage.tsx`:**
- Tambah ukuran menengah di `sm`: `w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96`

---

## Step 2 — About Me Section

**File yang diubah:** `components/sections/AboutMe.tsx`

### Masalah
- Grid `md:grid-cols-12` baru aktif di `768px`. Di `sm` (640px–767px), layout hanya satu kolom.
- Grid info cards (`hidden md:grid`) tersembunyi di bawah `md`, jadi di `sm` info cards tidak muncul sama sekali.
- Deskripsi menjadi satu-satunya konten yang tampil di `sm`, padahal harusnya info cards juga muncul di bawah deskripsi.

### Solusi

**`AboutMe.tsx`:**
- Ubah class wrapper grid dari `grid-cols-1 md:grid-cols-12` menjadi `grid-cols-1 sm:grid-cols-12` agar dua kolom sudah aktif mulai `sm`.
- Ubah info cards container dari `hidden md:grid md:col-span-7 md:grid-cols-2` menjadi `grid col-span-1 sm:col-span-7 sm:grid-cols-2 grid-cols-2 gap-2` — artinya info cards selalu tampil (tidak `hidden`), dan di `sm` ke atas mengambil col-span 7 dari grid 12 kolom.
- Ubah deskripsi dari `col-span-1 md:col-span-5` menjadi `col-span-1 sm:col-span-5`.
- Di layar `< sm` (HP), layout tetap satu kolom dengan deskripsi di atas, lalu info cards di bawah dalam 2-kolom grid → tidak pecah.

---

## Step 3 — ProjectListItem

**File yang diubah:** `app/projects/_components/ProjectListItem.tsx`

### Masalah (terlihat di screenshot Live Preview)
- Card menggunakan `md:flex-row` — di bawah `md` layout masih `flex-col`.
- Di `sm` (layar sedang seperti Live Preview panel), layout `flex-col` membuat gambar full-width tinggi `h-56`, teks dan tombol tersusun vertikal, tapi container kolom Live Preview sempit sehingga tombol-tombol di bawah (`grid-cols-1 sm:grid-cols-3`) tumpang tindih/overflow.
- Padding kanan `md:pr-16` baru aktif di `md`, sehingga di `sm` konten sebenarnya full-width tapi ada banyak whitespace tak terkendali.
- Lebar gambar `md:w-96` terlalu besar sehingga di `sm` masih pakai `w-full h-56` — di panel yang sempit gambar terlihat terlalu dominan.

### Solusi

**`ProjectListItem.tsx`:**
- Ubah layout card dari `md:flex-row` menjadi `sm:flex-row` → di `sm` ke atas sudah horizontal.
- Ubah ukuran gambar: dari `md:w-96` menjadi `sm:w-40 md:w-72 lg:w-96` dan tinggi dari `h-56` menjadi `h-40 sm:h-auto` → proporsional saat horizontal.
- Ubah `sizes` image dari `(max-width: 768px) 100vw, 384px` menjadi `(max-width: 640px) 100vw, (max-width: 768px) 160px, (max-width: 1024px) 288px, 384px`.
- Ubah tombol bawah dari `grid-cols-1 sm:grid-cols-3` menjadi `grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-1 md:grid-cols-3` → di HP 3 kolom kalau cukup, di `sm` (saat sudah `flex-row` dan panel sempit) kembali ke 1 kolom agar tidak overflow, di `md` ke atas 3 kolom kembali.
- Hilangkan `pr-0 md:pr-16` dan ganti dengan `pr-0 md:pr-8` yang lebih moderat.
- Tambahkan `min-w-0` pada konten teks agar `truncate`/`line-clamp` bekerja dengan benar di flex container.

---

## Catatan Penting

- Kerjakan **Step 1** dulu, verifikasi, baru lanjut.
- Hanya ubah class Tailwind pada elemen yang relevan — jangan refactor struktur komponen.
- Jangan mengubah file lain di luar scope tiga file di atas.
- Jangan membuat breakpoint baru di `global.css`.

