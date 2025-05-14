
import { useState, useEffect } from "react";
import { Kategori } from "../lib/types";

interface FormKategoriProps {
  initialData?: Kategori;
  onSubmit: (data: Omit<Kategori, "id">) => void;
  onCancel: () => void;
}

const FormKategori = ({ initialData, onSubmit, onCancel }: FormKategoriProps) => {
  const [formData, setFormData] = useState({
    nama: "",
    keterangan: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama,
        keterangan: initialData.keterangan || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-2">
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
          Nama Kategori
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-gray-900"
          required
        />
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-gray-900"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          {initialData ? "Perbarui Kategori" : "Tambah Kategori"}
        </button>
      </div>
    </form>
  );
};

export default FormKategori;
