# Development Rules

## 1. Understand Before Implementing

- Sebelum menulis code, baca dan pahami `rules.md` dan `plan.md`.
- Periksa terlebih dahulu struktur project, architecture, dan component yang sudah tersedia.
- Jangan langsung membuat component/file baru sebelum memastikan belum ada yang dapat digunakan atau dikembangkan.

## 2. Reuse Before Create

- Prioritaskan penggunaan kembali component, utility, function, type, dan logic yang sudah ada.
- Jika component yang ada hampir sesuai, extend atau compose component tersebut daripada membuat duplikat.
- Jangan membuat component yang memiliki fungsi/UI yang sudah tersedia.

## 3. Modular & Reusable

- Buat code berdasarkan tanggung jawab yang jelas.
- Pecah component yang terlalu besar atau memiliki banyak tanggung jawab.
- Buat component reusable jika digunakan atau berpotensi digunakan kembali.
- Hindari menaruh seluruh UI, logic, dan data dalam satu file jika dapat dipisahkan secara wajar.

## 4. Follow Existing Architecture

- Ikuti architecture, folder structure, naming convention, dan pattern yang sudah digunakan project.
- Jangan mengubah architecture secara besar-besaran tanpa alasan yang jelas.
- Jangan membuat pattern baru jika pattern yang sudah ada masih sesuai.

## 5. Follow Existing Design System

- Sebelum membuat UI, periksa `global.css` dan file styling/configuration yang relevan.
- Gunakan warna, typography, spacing, radius, shadow, dan design token yang sudah tersedia.
- Jangan membuat warna atau design token baru jika nilai yang sesuai sudah tersedia.
- Jangan menggunakan nilai hardcoded jika sudah ada variable atau token yang dapat digunakan.
- Pastikan UI baru tetap konsisten dengan design system dan visual style project.

## 6. Avoid Duplication

- Jangan menduplikasi UI, component, logic, styling, atau data structure.
- Jika terdapat bagian yang sama, gunakan abstraction atau component yang sudah ada.

## 7. Code Quality

- Prioritaskan code yang sederhana, readable, maintainable, dan mudah dikembangkan.
- Hindari over-engineering dan abstraction yang tidak diperlukan.
- Jangan melakukan perubahan di luar scope yang ditentukan dalam `plan.md`.

## 8. Implementation Discipline

- Kerjakan **satu step dalam `plan.md` pada satu waktu**.
- Setelah selesai, verifikasi bahwa step tersebut berjalan dengan benar sebelum lanjut ke step berikutnya.
- Jangan mengerjakan step berikutnya tanpa instruksi.
- Jika menemukan masalah atau konflik dengan architecture yang ada, jelaskan terlebih dahulu sebelum mengambil keputusan besar.
