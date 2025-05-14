
import { useState, useEffect } from "react";
import { Barang, Kategori, KondisiBarang } from "../lib/types";

interface FormBarangProps {
  initialData?: Barang;
  kategori: Kategori[];
  onSubmit: (data: Omit<Barang, "id" | "kategoriNama">) => void;
  isLoading: boolean;
}

const FormBarang = ({ initialData, kategori, onSubmit, isLoading }: FormBarangProps) => {
  const [formData, setFormData] = useState({
    kodeBarang: "",
    namaBarang: "",
    kategoriId: "",
    jumlah: 1,
    satuan: "Unit",
    tanggalPerolehan: new Date().toISOString().split("T")[0],
    kondisi: "Baik" as KondisiBarang,
    lokasi: "",
    keterangan: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        kodeBarang: initialData.kodeBarang,
        namaBarang: initialData.namaBarang,
        kategoriId: initialData.kategoriId,
        jumlah: initialData.jumlah,
        satuan: initialData.satuan,
        tanggalPerolehan: initialData.tanggalPerolehan,
        kondisi: initialData.kondisi as KondisiBarang,
        lokasi: initialData.lokasi,
        keterangan: initialData.keterangan || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "jumlah" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const satuanOptions = ["Unit", "Buah", "Set", "Paket", "Lembar", "Lusin", "Kardus"];
  const kondisiOptions = ["Baik", "Rusak Ringan", "Rusak Berat"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="kodeBarang" className="block text-sm font-medium text-gray-700">
            Kode Barang
          </label>
          <input
            type="text"
            id="kodeBarang"
            name="kodeBarang"
            value={formData.kodeBarang}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="namaBarang" className="block text-sm font-medium text-gray-700">
            Nama Barang
          </label>
          <input
            type="text"
            id="namaBarang"
            name="namaBarang"
            value={formData.namaBarang}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="kategoriId" className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            id="kategoriId"
            name="kategoriId"
            value={formData.kategoriId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          >
            <option value="">Pilih Kategori</option>
            {kategori.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">
              Jumlah
            </label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              min="1"
              value={formData.jumlah}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <div className="space-y-2 flex-1">
            <label htmlFor="satuan" className="block text-sm font-medium text-gray-700">
              Satuan
            </label>
            <select
              id="satuan"
              name="satuan"
              value={formData.satuan}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              {satuanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tanggalPerolehan" className="block text-sm font-medium text-gray-700">
            Tanggal Perolehan
          </label>
          <input
            type="date"
            id="tanggalPerolehan"
            name="tanggalPerolehan"
            value={formData.tanggalPerolehan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="kondisi" className="block text-sm font-medium text-gray-700">
            Kondisi
          </label>
          <select
            id="kondisi"
            name="kondisi"
            value={formData.kondisi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          >
            {kondisiOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">
            Lokasi
          </label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
          Keterangan (Opsional)
        </label>
        <textarea
          id="keterangan"
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Memproses..." : initialData ? "Perbarui Barang" : "Tambah Barang"}
        </button>
      </div>
    </form>
  );
};

export default FormBarang;
