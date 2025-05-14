
export interface Barang {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  kategoriId: string;
  kategoriNama: string;
  jumlah: number;
  satuan: string;
  tanggalPerolehan: string;
  kondisi: string;
  lokasi: string;
  keterangan?: string;
}

export interface Kategori {
  id: string;
  nama: string;
  keterangan?: string;
}

export type KondisiBarang = "Baik" | "Rusak Ringan" | "Rusak Berat";
