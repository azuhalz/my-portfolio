# Rencana Slicing UI Login CMS

Tujuan: buat halaman UI login CMS yang mirip referensi. Fokus pada tampilan saja, tanpa autentikasi atau API.

1. Baca panduan Next.js yang relevan di `node_modules/next/dist/docs/` sebelum mengubah kode. Cek struktur folder proyek terlebih dahulu.

2. Buat route login CMS, misalnya `app/cms/login/page.tsx`. Jangan mengubah halaman portofolio yang sudah selesai.

3. Buat halaman dengan tiga kolom di desktop:
   - Kiri: logo `AZZ.`, teks `Portfolio CMS`, judul “Manage. Build. Grow.”, deskripsi, tiga poin keunggulan, dan copyright.
   - Tengah: kartu login berborder ungu dengan logo bulat, judul “Welcome Back”, input email, input password, checkbox, link lupa password, tombol Sign In, dan link kembali ke portofolio.
   - Kanan: ilustrasi dashboard sederhana. Gunakan elemen HTML/CSS seperti card, garis grafik, kotak transparan, dan glow ungu; tidak perlu gambar atau library baru.

4. Gunakan warna gelap, teks putih/abu-abu, aksen ungu, border tipis, gradient, dan shadow/glow agar mendekati referensi. Gunakan class Tailwind yang sederhana dan konsisten.

5. Gunakan `lucide-react` untuk ikon yang diperlukan: mail, lock, eye/eye-off, arrow-left, zap, shield, dan chart. Jangan menambahkan dependensi.

6. Buat interaksi kecil saja:
   - Tombol mata mengubah tampilan password.
   - Checkbox Remember me dapat dicentang.
   - Form tidak perlu memproses login; saat submit cukup `preventDefault()`.
   - Link Back to Portfolio mengarah ke `/`.

7. Buat responsif:
   - Desktop menampilkan tiga kolom.
   - Tablet menyembunyikan atau mengecilkan ilustrasi kanan.
   - Mobile hanya menampilkan kartu login, dengan logo singkat di atasnya.

8. Jalankan `npm run lint` setelah selesai. Perbaiki error yang muncul tanpa mengubah fitur portofolio yang ada.
