# Sistem Inventaris Barang Kantor Berbasis Web

## Deskripsi

Sistem Inventaris Barang Kantor Berbasis Web adalah aplikasi modern yang dirancang untuk membantu perusahaan atau instansi dalam mengelola aset dan inventaris barang kantor secara efisien, terstruktur, dan mudah diakses melalui browser.  
Aplikasi ini memudahkan pencatatan, pelacakan, dan pengelolaan barang serta kategori barang, serta menyediakan fitur autentikasi pengguna.

---

## Kegunaan & Fungsi

- **Pencatatan Barang:** Memudahkan staf administrasi dalam mencatat barang-barang inventaris kantor secara digital.
- **Manajemen Kategori:** Mengelompokkan barang berdasarkan kategori untuk memudahkan pencarian dan pelaporan.
- **Pelacakan Kondisi & Lokasi:** Memantau kondisi, jumlah, dan lokasi barang secara real-time.
- **Autentikasi Pengguna:** Mendukung fitur pendaftaran dan login untuk keamanan data.
- **Pengelolaan Data:** Mendukung proses tambah, edit, dan hapus data barang maupun kategori.

---

## Fitur-Fitur Utama

- **Dashboard Inventaris:** Menampilkan ringkasan dan statistik barang inventaris.
- **Manajemen Barang:**
  - Tambah, edit, dan hapus data barang.
  - Lihat detail barang, kondisi, jumlah, lokasi, dan keterangan.
- **Manajemen Kategori:**
  - Tambah, edit, dan hapus kategori barang.
  - Pengelompokan barang berdasarkan kategori.
- **Pencarian & Filter:** Cari barang berdasarkan nama atau kategori.
- **Autentikasi Pengguna:**
  - Registrasi akun baru.
  - Login dan logout.
- **Notifikasi:** Feedback visual untuk setiap aksi (sukses/gagal).
- **Desain Responsif:** Tampilan modern dan responsif untuk desktop maupun mobile.

---

## Teknologi yang Digunakan

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** untuk styling
- **React Hooks & Context** untuk manajemen state
- **Modular Components** untuk kemudahan pengembangan

### Backend
- **Python** dengan framework **Pyramid**
- **PostgreSQL** sebagai database utama
- **SQLAlchemy** sebagai ORM
- **Alembic** untuk migrasi database

---

## Struktur Folder

```
backend/
  pyramid_mahasiswa/
    pyramid_mahasiswa/
      models/
      alembic/
      development.ini
      production.ini
      ...
frontend/
  src/
    pages/
    components/
    utils/
    ...
```

---

## Cara Menjalankan Project

### Backend

1. **Install dependencies**  
   Masuk ke folder backend dan install requirements:
   ```
   pip install -e .
   ```

2. **Konfigurasi Database**  
   Pastikan PostgreSQL sudah berjalan dan database sudah dibuat.  
   Edit `development.ini` atau `production.ini` untuk menyesuaikan koneksi database.

3. **Migrasi Database**  
   Jalankan migrasi untuk membuat tabel:
   ```
   alembic -c pyramid_mahasiswa/development.ini upgrade head
   ```

4. **Jalankan Backend**  
   ```
   pserve pyramid_mahasiswa/development.ini
   ```

### Frontend

1. **Install dependencies**  
   Masuk ke folder frontend dan install dependencies:
   ```
   npm install
   ```

2. **Jalankan Frontend**  
   ```
   npm run dev
   ```

---

## Kontribusi

Kontribusi sangat terbuka untuk pengembangan lebih lanjut, baik dari sisi fitur, desain, maupun integrasi sistem.

---

## Lisensi

Aplikasi ini dikembangkan untuk keperluan edukasi dan dapat digunakan serta dimodifikasi sesuai kebutuhan.
