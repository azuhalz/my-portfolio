# Plan: Layout Bersama dan Routing Konten CMS

## Tujuan

Menjadikan sidebar CMS dan dashboard header sebagai shell bersama untuk seluruh halaman pengelolaan CMS. Setiap item sidebar dapat diklik, memiliki URL sendiri, dan diberi state aktif ungu berdasarkan route saat ini. Konten route baru sengaja kosong pada tahap ini.

`/cms/login` tetap menjadi pengecualian: halaman autentikasi tidak memakai sidebar/header dashboard. Semua route administrasi lain memakai shell yang sama.

## Struktur Route

Gunakan route group `app/cms/(dashboard)/` agar layout hanya membungkus halaman administrasi, tanpa mengubah URL dan tanpa membungkus login:

| URL | File page | Label sidebar |
| --- | --- | --- |
| `/cms/dashboard` | `dashboard/page.tsx` | Dashboard |
| `/cms/hero` | `hero/page.tsx` | Hero Section |
| `/cms/about` | `about/page.tsx` | About |
| `/cms/tech-stack` | `tech-stack/page.tsx` | Tech Stack |
| `/cms/projects` | `projects/page.tsx` | Projects |
| `/cms/work-experience` | `work-experience/page.tsx` | Work Experience |
| `/cms/education` | `education/page.tsx` | Education |
| `/cms/organizational-experience` | `organizational-experience/page.tsx` | Organizational Experience |
| `/cms/certifications` | `certifications/page.tsx` | Certifications |
| `/cms/contact` | `contact/page.tsx` | Contact |
| `/cms/settings` | `settings/page.tsx` | Settings |

Pindahkan dashboard page yang ada ke dalam route group tersebut; URL `/cms/dashboard` tetap sama. Buat page placeholder untuk sepuluh route lainnya dengan komponen `EmptyCmsPage` reusable yang hanya memberi struktur semantik tanpa tampilan konten.

## Implementasi Layout dan Navigasi

- Tambahkan `app/cms/(dashboard)/layout.tsx` sebagai layout server untuk shell CMS: container fixed desktop yang sudah dipakai dashboard, grid sidebar 224px, header sticky, lalu `<main>{children}</main>`. Pindahkan wrapper shell dari page dashboard ke layout ini agar tidak ada sidebar/header ganda.
- Ubah `CmsSidebar` menjadi client component dan gunakan `next/link` + `usePathname()`. Sidebar membaca data navigasi tunggal dan membandingkan pathname secara exact dengan `href`; hanya route aktif yang memakai border, background, shadow, dan teks/ikon ungu.
- Perbarui `DashboardHeader` agar dapat dipakai layout pada semua route. Pertahankan View Website, notification badge, profile, dan menu account; judul serta subjudul diturunkan dari item navigasi aktif sehingga Hero, About, dan halaman lain tidak tetap berjudul “Dashboard”.
- Perluas `dashboardNavItems` menjadi source of truth typed dengan `label`, `href`, `icon`, serta subtitle header. Hapus flag `active` statis agar state tidak pernah salah setelah navigasi.
- Pertahankan layout desktop tanpa breakpoint tambahan. Semua page placeholder tetap mewarisi ukuran kanvas, scrollbar, background, sidebar, dan header yang sama.

## Kompatibilitas dan Batasan

- `app/cms/login/page.tsx` dan komponen login tetap berada di luar route group. Hapus directive client dari page login bila hanya dipakai untuk metadata; interaktivitas form tetap berada di komponen client yang sudah ada, sehingga export metadata tetap valid.
- Jangan buat CRUD, form editor, API, autentikasi, dropdown aktif, atau konten detail untuk route placeholder. Link sidebar adalah satu-satunya interaksi baru yang diperlukan.
- Gunakan komponen, token warna, dan data CMS yang ada; tidak ada dependency baru atau perubahan pada route portofolio.

## Verifikasi

1. Buka setiap URL pada tabel dan pastikan route merender tanpa 404 dengan sidebar/header yang sama.
2. Pastikan link sidebar menuju URL tepat dan hanya item route saat ini yang berwarna ungu, termasuk setelah refresh langsung pada URL tersebut.
3. Pastikan `/cms/login` tetap menampilkan layout login tanpa sidebar atau dashboard header.
4. Pastikan `/cms/dashboard` mempertahankan semua panel dashboard yang sudah ada setelah wrapper dipindahkan ke layout.
5. Jalankan lint spesifik file CMS baru/diubah, `tsc --noEmit`, lalu build; catat terpisah kegagalan lama atau kegagalan environment yang tidak terkait.
