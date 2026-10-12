# Plan: CMS Hero Section — Slicing UI

## Tujuan
Membuat halaman CMS untuk mengedit Hero Section (`app/cms/(dashboard)/hero/page.tsx`).
Tampilannya terdiri dari dua kolom:
- **Kiri**: Form untuk mengedit konten hero (teks, tombol, social links, gambar profil).
- **Kanan**: Live Preview hero section.

---

## Referensi Desain
Layout dua kolom:
- **Content Panel** (kiri): input fields + social links + image upload + tombol Save.
- **Live Preview Panel** (kanan): menampilkan tampilan hero seperti di halaman publik.

---

## Analisis Komponen yang Ada (Reuse First)

| Yang Sudah Ada | Dapat Digunakan Untuk |
|---|---|
| `components/ui/Card.tsx` | Wrapper panel kiri & kanan |
| `components/ui/Button.tsx` | Tombol Save Changes, Change Image, Remove |
| `lib/data/contact-data.ts` (tipe `SocialLink`) | Referensi tipe data social links |

---

## Tipe Data

Definisikan `HeroFormData` di `HeroCmsPage.tsx`:

```ts
type HeroFormData = {
  greetingText: string;
  displayName: string;
  headline: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  socials: {
    iconType: "github" | "linkedin" | "email" | "instagram";
    url: string;
  }[];
  profileImageUrl: string;
};
```

---

## Struktur File

### A. Komponen Form Reusable (BARU — `components/form/`)

Komponen-komponen ini **bersifat umum** dan bisa dipakai di semua halaman CMS lainnya (bukan hanya Hero).

```
components/form/
  ├── TextField.tsx          ← Label + input text (reusable di seluruh CMS)
  └── ImageUpload.tsx        ← Thumbnail + tombol ganti/hapus gambar (reusable)
```

#### `TextField.tsx`
- Props: `label: string`, `value: string`, `onChange`, `placeholder?`, `type?`
- Render: `<label>` di atas + `<input>` di bawah, styling konsisten.
- Dipakai untuk: Greeting Text, Display Name, Role/Headline, Primary Button Text, Secondary Button Text.

#### `ImageUpload.tsx`
- Props: `imageUrl: string`, `fileName?: string`, `onChange: (url: string) => void`
- Render: thumbnail gambar + nama file + keterangan format + tombol **Change Image** + tombol **Remove**.
- Tombol Change Image → trigger `<input type="file" accept="image/*">` (tersembunyi).
- Tombol Remove → panggil `onChange("")`.

---

### B. Komponen CMS Hero (`app/cms/(dashboard)/hero/_components/`)

```
app/cms/(dashboard)/hero/
  ├── page.tsx                      ← UPDATE: ganti EmptyCmsPage → HeroCmsPage
  └── _components/
      ├── HeroCmsPage.tsx           ← Induk: layout 2 kolom + state HeroFormData
      ├── HeroContentForm.tsx       ← Panel kiri: menyusun semua field form
      ├── HeroSocialLinksForm.tsx   ← Sub-komponen: daftar baris social link (icon + TextField + link icon)
      └── HeroLivePreview.tsx       ← Panel kanan: preview tampilan hero
```

> **Catatan**: Komponen `Hero.tsx` dan sub-komponen di `components/sections/hero/`
> **tidak boleh diubah**. Live Preview dirender manual menggunakan data dari form.

---

## Step-by-Step Implementasi

### Step 1 — Buat `components/form/TextField.tsx` [SELESAI]
Komponen reusable untuk satu baris label + input teks.

```tsx
type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};
```
- Styling input: `w-full bg-card border border-border rounded-lg px-3 py-2 text-text-primary`.
- Styling label: `text-sm text-text-secondary mb-1`.

---

### Step 2 — Buat `components/form/ImageUpload.tsx` [SELESAI]
Komponen reusable untuk upload gambar (thumbnail + ganti + hapus).

```tsx
type ImageUploadProps = {
  imageUrl: string;
  fileName?: string;
  onChange: (url: string) => void;
};
```
- Tampilkan `<Image>` dari next/image jika `imageUrl` tidak kosong.
- Tombol Change Image → `Button` variant `outline`.
- Tombol Remove → `Button` dengan warna merah (gunakan `className` manual karena belum ada variant danger).
- Gunakan `<input type="file">` tersembunyi yang di-trigger oleh tombol Change Image.

---

### Step 3 — Buat `HeroCmsPage.tsx` [SELESAI]
Komponen induk halaman CMS Hero:
- State `HeroFormData` disimpan di sini menggunakan `useState`.
- Layout 2 kolom: `HeroContentForm` (kiri) + `HeroLivePreview` (kanan).
- Fungsi `handleFieldChange(field, value)` untuk update state.
- Fungsi `handleSocialChange(index, url)` untuk update satu social link.
- Fungsi `handleImageChange(url, fileName)` untuk update gambar.
- Fungsi `handleSave()` untuk menyimpan data.

---

### Step 4 — Buat `HeroContentForm.tsx` [SELESAI]
Panel kiri berisi semua field form yang disusun vertikal di dalam `Card`:
- Gunakan `TextField` untuk: Greeting Text, Display Name, Role/Headline, Primary Button Text, Secondary Button Text.
- Render `HeroSocialLinksForm` di bawah field teks (placeholder disiapkan untuk Step 5).
- Render `ImageUpload` di bawah social links.
- Tombol **Save Changes** (`Button` variant `primary`, lebar penuh) di paling bawah.

---

### Step 5 — Buat `HeroSocialLinksForm.tsx` [SELESAI]
Sub-komponen untuk daftar social links. Setiap baris terdiri dari:
- **Ikon** platform (dari `react-icons/fa`): GitHub, LinkedIn, Email, Instagram.
- **Input URL** dengan styling konsisten.
- **Ikon link eksternal** (`ExternalLink` dari lucide-react) sebagai tombol buka URL di tab baru.

Props:
```tsx
type HeroSocialLinksFormProps = {
  socials: HeroFormData["socials"];
  onChange: (index: number, url: string) => void;
};
```

---

### Step 6 — Buat `HeroLivePreview.tsx` [SELESAI]
Panel kanan yang me-render preview hero berdasarkan data form:
- Wrapper `Card` dengan label "Live Preview" di atas.
- Render interaktif yang langsung terhubung ke perubahan state form.
- Tampilkan: greeting text, nama, headline, dua tombol, social icons, dan gambar profil dengan efek lingkaran latar belakang.

Props:
```tsx
type HeroLivePreviewProps = {
  data: HeroFormData;
};
```

---

### Step 7 — Update `app/cms/(dashboard)/hero/page.tsx` [SELESAI]
- Hapus `EmptyCmsPage`.
- Import dan render `HeroCmsPage`.

---

## Status Akhir
Semua step (Step 1 s.d. Step 7) telah selesai diimplementasikan dengan sukses dan lolos uji verifikasi TypeScript serta ESLint.

- ✅ Gunakan `Card`, `Button` dari `components/ui/` yang sudah ada.
- ✅ Gunakan warna dari `globals.css` (`text-primary`, `text-text-secondary`, `border-border`, dll).
- ✅ Jangan buat warna baru atau hardcode nilai warna.
- ✅ CMS hanya untuk desktop — tidak perlu class responsive (`sm:`, `md:`, `lg:`).
- ✅ Kerjakan satu step setiap kali diminta, verifikasi dulu sebelum lanjut.
- ❌ Jangan ubah komponen Hero yang sudah ada di `components/sections/hero/`.
