# Plan: Implementasi Dashboard CMS

## Tujuan

Membuat halaman dashboard CMS desktop di route `/cms` yang meniru referensi: sidebar permanen, top bar, empat kartu metrik, daftar proyek dan pesan terbaru, panel analytics, serta kumpulan quick actions. Halaman merupakan dashboard visual dengan data demo lokal; tidak mencakup autentikasi, penyimpanan data, CRUD, maupun halaman manajemen lanjutan. Tidak ada pekerjaan responsivitas—layout mempertahankan kanvas desktop dengan `min-width` dan overflow horizontal bila viewport lebih kecil.

## Arsitektur & Data

- Tambahkan `app/cms/page.tsx` sebagai entry point dashboard. Gunakan container `fixed inset-0 z-50 overflow-auto` seperti halaman login CMS agar dashboard menutupi `Navbar`, `Footer`, dan `MouseBackground` portofolio tanpa mengubah root layout.
- Buat `lib/data/cms-dashboard-data.ts` sebagai satu sumber data statis dan typed untuk item sidebar, empat metrik, proyek terbaru, titik chart/summary analytics, pesan, dan quick action. Gunakan empat asset proyek yang sudah ada di `public/images` sebagai thumbnail; gunakan avatar berbasis inisial untuk pesan karena repo tidak memiliki asset foto pengirim.
- Pertahankan data portofolio asli tidak berubah. Data dashboard mengikuti copy dan angka referensi (`12`, `2,543`, `7`, `May 25, 2025`, serta summary analytics) agar preview konsisten.

## Komponen Dashboard

- Buat komponen modular di `components/cms/dashboard/`: `CmsSidebar`, `DashboardHeader`, `RecentProjects`, `AnalyticsPanel`, `RecentMessages`, dan `QuickActions`. Halaman `/cms` hanya mengomposisikan komponen tersebut dalam grid desktop.
- Ekstrak `MetricCard` dari folder login ke `components/cms/MetricCard.tsx` sebagai komponen bersama, bukan membuat kartu metrik duplikat. Pertahankan props `label` dan `value` untuk `DashboardPreview`, lalu tambahkan props opsional untuk ikon, trend, label trend, dan sparkline. Dashboard memakai varian lengkap; preview login tetap tampak dan bekerja seperti sekarang.
- Implementasikan grafik analytics sebagai SVG inline reusable di `AnalyticsPanel`: area fill gradient, polyline/kurva, titik data, serta label sumbu/tanggal berasal dari data lokal. Jangan menambahkan library chart.
- Sidebar menampilkan logo AZZ., seluruh item navigasi dari referensi dengan `Dashboard` aktif, footer `AZZ. CMS v2.0.0`, dan ikon Lucide. Top bar berisi judul/subjudul, link `View Website` ke `/`, tombol notifikasi dengan badge `3`, avatar admin, nama/email, dan tombol dropdown visual.
- Jadikan `View All` proyek sebagai link ke `/projects` dan `View Website` ke `/`. Kontrol periode analytics, notifikasi, dropdown admin, sidebar item tanpa route CMS tujuan, serta quick action tetap visual/nonaktif pada tahap ini agar tidak menghasilkan navigasi atau CRUD palsu.

## Desain

- Gunakan token yang telah ada di `app/globals.css`: `background`, `card`, `border`, `primary`, dan token teks. Tambahkan satu token semantik `success` hanya untuk indikator kenaikan hijau karena belum ada padanannya di design system.
- Ikuti gaya referensi: latar navy/black, border redup, radius kartu konsisten, aksen ungu untuk ikon, active nav, sparkline, dan link; gunakan efek glow/shadow transparan berbasis warna `primary` yang sudah dipakai komponen CMS login.
- Susun desktop canvas dengan sidebar sekitar 224px, header sekitar 84px, area konten ber-grid: metrik 4 kolom; proyek dan analytics berdampingan; messages dan quick actions di bawahnya. Quick action berisi delapan kartu, masing-masing dengan ikon, judul, dan deskripsi referensi.

## Batasan yang Disepakati

- Dashboard hanya UI statis dengan data lokal; tidak ada API, database, login enforcement, chart real-time, atau implementasi CRUD.
- Tidak ada breakpoint atau adaptasi mobile/tablet untuk dashboard CMS pada tahap ini.
- Tidak menambahkan package baru dan tidak mengubah fitur portofolio di luar isolasi tampilan route `/cms`.
