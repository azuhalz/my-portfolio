# Plan: Perbaikan Navigasi Anchor Navbar di Mobile

## Tujuan

Memastikan setiap link section di menu hamburger (`About`, `Experience`, `Education`, `Certifications`, dan `Contact`) selalu berhenti pada section dengan `id` yang sesuai setelah diketuk pada viewport mobile/tablet. Perilaku navbar desktop yang sudah benar tidak diubah.

## Temuan Awal

- `Navbar.tsx` memakai satu handler untuk navigasi desktop dan mobile.
- Pada handler itu, `setIsMenuOpen(false)` dan `element.scrollIntoView()` dipanggil dalam klik yang sama.
- Pada mobile, menutup `MobileMenu` menghapus tinggi menu dari navbar sticky. Scroll dapat dihitung ketika menu masih terbuka, kemudian posisi halaman bergeser setelah React merender menu tertutup. Ini menjelaskan hasil yang tidak konsisten (misalnya target Certifications tampak berada di sekitar Organizational), sedangkan desktop tidak terdampak karena menu tidak berubah tinggi.
- Semua target yang dirujuk navbar telah tersedia (`about`, `experience`, `education`, `certifications`, `contact`), dan `app/globals.css` sudah memiliki `scroll-margin-top` untuk section ber-id. Jadi fokus perbaikan adalah urutan render dan scroll, bukan menambah atau mengganti `id`.

## Rencana Implementasi

1. Di `components/layout/Navbar.tsx`, pisahkan aksi scroll ke helper tunggal, misalnya `scrollToSection(id, href)`.
   - Helper mengambil elemen berdasarkan `id`.
   - Jalankan `scrollIntoView({ behavior: "smooth", block: "start" })` setelah layout stabil.
   - Perbarui hash URL dan state menu aktif hanya setelah target valid ditemukan.

2. Tambahkan state sementara untuk menyimpan `id` link mobile yang menunggu di-scroll.
   - Jika link anchor ditekan dari menu hamburger pada halaman utama, cegah navigasi default, simpan target tersebut, lalu tutup menu.
   - Jangan melakukan scroll pada handler klik yang masih menjalankan `setIsMenuOpen(false)`.
   - Saat render berikutnya mengonfirmasi `isMenuOpen === false`, gunakan `useEffect` dan satu frame render (`requestAnimationFrame`) untuk menjalankan helper scroll. Dengan begitu, posisi target dihitung sesudah tinggi menu mobile hilang dari dokumen.
   - Bersihkan state target setelah scroll agar efek tidak terulang saat render berikutnya.

3. Pertahankan jalur desktop dan navigasi antarhalaman.
   - Untuk navbar desktop di halaman utama, tetap lakukan smooth scroll langsung karena tidak ada perubahan tinggi menu.
   - Untuk link `Projects` dan link yang diklik dari route selain `/`, biarkan perilaku `next/link` yang ada menangani perubahan route/hash. Jangan memaksa scroll ke elemen yang belum dirender.
   - Bila perlu membedakan sumber klik desktop/mobile, teruskan `variant` dari `NavLinks` atau sediakan callback khusus dari `MobileMenu`, dengan tipe TypeScript yang tetap eksplisit.

4. Pertahankan offset navbar saat validasi.
   - Gunakan aturan `section[id] { scroll-margin-top: 5rem; }` yang sudah ada sebagai sumber offset tunggal.
   - Jangan menambahkan offset JavaScript kedua, supaya posisi tidak terdorong ganda dan hasil desktop tetap konsisten.

## File yang Direncanakan Berubah

1. `components/layout/Navbar.tsx`
   - Mengatur urutan: tutup menu mobile → tunggu layout stabil → scroll ke target.
   - Memisahkan helper scroll dan sinkronisasi hash/active link.

2. `components/layout/MobileMenu.tsx` dan/atau `components/layout/NavLinks.tsx` (hanya jika dibutuhkan)
   - Menyediakan penanda/callback bahwa klik berasal dari varian mobile, tanpa mengubah markup atau gaya navigasi desktop.

## Verifikasi Setelah Implementasi

1. Uji pada viewport di bawah breakpoint `lg` dengan menu hamburger terbuka.
2. Dari beberapa posisi awal berbeda (dekat atas, tengah, dan bawah halaman), ketuk `About`, `Experience`, `Education`, `Certifications`, lalu `Contact`.
3. Pastikan setiap klik menutup menu dan heading section target muncul di bawah navbar sticky, bukan di section sebelum/berikutnya.
4. Uji ulang klik cepat antar-link untuk memastikan hanya target terakhir yang dijalankan dan tidak ada scroll lama yang tertinggal.
5. Uji desktop pada semua anchor serta link `/projects`; pastikan smooth scroll, highlight aktif, hash URL, dan navigasi route tetap berfungsi.
6. Jalankan lint/build proyek setelah perubahan untuk memeriksa tipe callback dan aturan React hook.

## Batasan

- Tidak ada perubahan konten section, data navigasi, animasi section, atau styling desain selain yang benar-benar diperlukan untuk sinkronisasi scroll mobile.
- Tidak menambahkan library baru.
