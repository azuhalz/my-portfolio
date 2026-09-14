# Refactoring Plan

## Refactor `Contact.tsx`

Saya ingin melakukan refactor pada file:

`sections/Contact.tsx`

Tujuan:

- Membuat code lebih sederhana dan modular.
- Memisahkan data dari UI.
- Menggunakan reusable component yang sudah tersedia.
- Menghindari duplicate component, UI, dan logic.
- Mempertahankan UI dan functionality yang sudah ada.

### Requirements

1. **Inspect terlebih dahulu**
   - Baca dan pahami `Contact.tsx`.
   - Periksa struktur project dan existing components.
   - Periksa `global.css` yang sudah tersedia.
   - Identifikasi component, utility, data, dan logic yang sudah dapat digunakan kembali.

2. **Refactor**
   - Pisahkan data dari component ke `lib/Contact-data.ts`.
   - Gunakan existing component jika sudah tersedia.
   - Jika diperlukan, buat component baru hanya untuk responsibility yang jelas dan reusable.
   - Jangan membuat duplicate component.
   - Sederhanakan logic dan struktur code.
   - Ikuti architecture dan pattern yang sudah digunakan project.
   - Gunakan styling/design system yang sudah tersedia.

3. **Constraints**
   - Hanya refactor `Contact.tsx` dan file yang benar-benar diperlukan untuk section ini.
   - Jangan mengubah section lain.
   - Jangan mengubah UI atau functionality.
   - Jangan melakukan over-engineering.

4. **Verification**
   - Pastikan UI dan functionality tetap sama.
   - Pastikan data sudah terpisah dari UI.
   - Pastikan existing components digunakan kembali jika memungkinkan.
   - Pastikan tidak ada duplicate component atau logic.
