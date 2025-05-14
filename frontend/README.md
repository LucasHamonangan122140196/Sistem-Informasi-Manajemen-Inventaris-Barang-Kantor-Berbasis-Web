
# Sistem Informasi Manajemen Inventaris Barang Kantor Berbasis Web

## Informasi Proyek

Aplikasi web berbasis React untuk pengelolaan inventaris barang kantor.

## Teknologi yang Digunakan

Proyek ini dibangun dengan:

- React JS (Functional Components + Hooks)
- React Router DOM untuk navigasi halaman
- Tailwind CSS untuk styling responsif
- TypeScript untuk type safety

## Fitur Utama

- Dashboard dengan ringkasan inventaris
- Manajemen barang (lihat, tambah, edit, hapus)
- Manajemen kategori barang
- Pencarian dan pengurutan data barang
- Tampilan responsif untuk perangkat mobile dan desktop

## Cara Menjalankan Proyek

### Prasyarat

Node.js dan npm harus sudah terinstal.

### Langkah-langkah

```sh
# Langkah 1: Clone repository
git clone <URL_REPOSITORI>

# Langkah 2: Pindah ke direktori proyek
cd sistem-inventaris-barang-kantor

# Langkah 3: Install dependensi
npm install

# Langkah 4: Jalankan aplikasi dalam mode pengembangan
npm run dev
```

## Struktur Komponen

- `src/pages/Index.tsx` - Halaman utama dashboard
- `src/pages/DaftarBarang.tsx` - Menampilkan daftar barang
- `src/pages/TambahBarang.tsx` - Form tambah data barang
- `src/pages/EditBarang.tsx` - Form edit data barang
- `src/pages/DaftarKategori.tsx` - Manajemen kategori barang
- `src/components/` - Komponen reusable (form, tabel, dll)

