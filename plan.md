# Plan: Menambahkan Field Name pada Settings CMS

Berdasarkan `rules.md` (khususnya prinsip Single Source of Truth, Reuse, Modular, dan Follow Architecture), berikut adalah rancangan implementasi:

## Analisis Arsitektur & Best Practice
1. **Pemisahan Tanggung Jawab (Profile vs Security)**:
   - Di CMS dan Backend Go (`internal/model/admin.go`), profile admin terdiri dari `Name` dan `Email` (`UpdateAdminProfileRequest`), sedangkan `Password` ditangani secara terpisah (`UpdateAdminPasswordRequest`).
   - Menggabungkan `Name` dan `Email` ke dalam satu section informasi profil ("Profile Information" atau "Account Information") dengan satu tombol "Save Profile" / "Save Changes" jauh lebih bersih, intuitif, dan sesuai dengan endpoint backend yang ada (`PUT /api/admin/profile`).
   - Section password tetap terpisah sebagai keamanan akun ("Password" / "Change Password").

## Langkah Kerja:
- [x] **Step 1: Update Data Model**
  - Perbarui [settings-data.ts](file:///Users/azuhalz/Documents/ZUHAL/Coding/Next js/my-portfolio/lib/data/settings-data.ts) untuk menambahkan `name` ke `accountData` dan interface profile.
- [x] **Step 2: Refactor/Update Section Profile**
  - Ubah [EmailSettingsSection.tsx](file:///Users/azuhalz/Documents/ZUHAL/Coding/Next js/my-portfolio/app/cms/(dashboard)/settings/_components/EmailSettingsSection.tsx) menjadi `ProfileSettingsSection.tsx` yang memiliki input `Name` dan `Email`, layout responsif `grid grid-cols-1 md:grid-cols-2`, dengan tombol `SaveChangesButton`.
- [x] **Step 3: Update SettingsCmsPage**
  - Sesuaikan [SettingsCmsPage.tsx](file:///Users/azuhalz/Documents/ZUHAL/Coding/Next js/my-portfolio/app/cms/(dashboard)/settings/_components/SettingsCmsPage.tsx) untuk menampilkan section Profile baru dan Password section.
- [x] **Step 4: Typecheck & Verifikasi**
  - Berhasil divalidasi dengan `npx tsc --noEmit` tanpa error.
