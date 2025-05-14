
import { Barang, Kategori } from "./types";

const kategori: Kategori[] = [
  {
    id: "1",
    nama: "Elektronik",
    keterangan: "Peralatan elektronik kantor seperti komputer, printer, dll."
  },
  {
    id: "2",
    nama: "Furniture",
    keterangan: "Perabotan kantor seperti meja, kursi, lemari, dll."
  },
  {
    id: "3",
    nama: "ATK",
    keterangan: "Alat tulis kantor"
  },
  {
    id: "4",
    nama: "Peralatan",
    keterangan: "Peralatan umum kantor"
  }
];

const barang: Barang[] = [
  {
    id: "1",
    kodeBarang: "INV-EL-001",
    namaBarang: "Laptop Asus VivoBook",
    kategoriId: "1",
    kategoriNama: "Elektronik",
    jumlah: 5,
    satuan: "Unit",
    tanggalPerolehan: "2023-01-15",
    kondisi: "Baik",
    lokasi: "Ruang Administrasi",
    keterangan: "Laptop untuk staf administrasi"
  },
  {
    id: "2",
    kodeBarang: "INV-EL-002",
    namaBarang: "Printer Epson L3110",
    kategoriId: "1",
    kategoriNama: "Elektronik",
    jumlah: 2,
    satuan: "Unit",
    tanggalPerolehan: "2023-02-20",
    kondisi: "Baik",
    lokasi: "Ruang Administrasi",
    keterangan: "Printer untuk keperluan kantor"
  },
  {
    id: "3",
    kodeBarang: "INV-FR-001",
    namaBarang: "Meja Kerja",
    kategoriId: "2",
    kategoriNama: "Furniture",
    jumlah: 10,
    satuan: "Unit",
    tanggalPerolehan: "2022-11-05",
    kondisi: "Baik",
    lokasi: "Ruang Staf",
    keterangan: "Meja kerja staf"
  },
  {
    id: "4",
    kodeBarang: "INV-FR-002",
    namaBarang: "Kursi Kerja",
    kategoriId: "2",
    kategoriNama: "Furniture",
    jumlah: 10,
    satuan: "Unit",
    tanggalPerolehan: "2022-11-05",
    kondisi: "Baik",
    lokasi: "Ruang Staf",
    keterangan: "Kursi kerja staf"
  },
  {
    id: "5",
    kodeBarang: "INV-ATK-001",
    namaBarang: "Kertas HVS A4",
    kategoriId: "3",
    kategoriNama: "ATK",
    jumlah: 10,
    satuan: "Rim",
    tanggalPerolehan: "2023-05-10",
    kondisi: "Baik",
    lokasi: "Gudang ATK",
    keterangan: "Kertas untuk kebutuhan kantor"
  },
  {
    id: "6",
    kodeBarang: "INV-EL-003",
    namaBarang: "Proyektor Epson",
    kategoriId: "1",
    kategoriNama: "Elektronik",
    jumlah: 1,
    satuan: "Unit",
    tanggalPerolehan: "2023-03-15",
    kondisi: "Rusak Ringan",
    lokasi: "Ruang Rapat",
    keterangan: "Proyektor untuk presentasi, lampu agak redup"
  },
  {
    id: "7",
    kodeBarang: "INV-FR-003",
    namaBarang: "Lemari Arsip",
    kategoriId: "2",
    kategoriNama: "Furniture",
    jumlah: 3,
    satuan: "Unit",
    tanggalPerolehan: "2022-10-20",
    kondisi: "Baik",
    lokasi: "Ruang Arsip",
    keterangan: "Lemari untuk menyimpan dokumen"
  },
  {
    id: "8",
    kodeBarang: "INV-ATK-002",
    namaBarang: "Pulpen",
    kategoriId: "3",
    kategoriNama: "ATK",
    jumlah: 50,
    satuan: "Buah",
    tanggalPerolehan: "2023-06-01",
    kondisi: "Baik",
    lokasi: "Gudang ATK",
    keterangan: "Pulpen warna hitam"
  },
  {
    id: "9",
    kodeBarang: "INV-PL-001",
    namaBarang: "Tool Kit",
    kategoriId: "4",
    kategoriNama: "Peralatan",
    jumlah: 2,
    satuan: "Set",
    tanggalPerolehan: "2023-04-10",
    kondisi: "Baik",
    lokasi: "Ruang Maintenance",
    keterangan: "Peralatan untuk maintenance"
  },
  {
    id: "10",
    kodeBarang: "INV-EL-004",
    namaBarang: "AC Panasonic 1PK",
    kategoriId: "1",
    kategoriNama: "Elektronik",
    jumlah: 4,
    satuan: "Unit",
    tanggalPerolehan: "2022-12-15",
    kondisi: "Rusak Berat",
    lokasi: "Gudang",
    keterangan: "AC lama yang sudah tidak berfungsi"
  }
];

const dataSample = {
  kategori,
  barang
};

export default dataSample;
