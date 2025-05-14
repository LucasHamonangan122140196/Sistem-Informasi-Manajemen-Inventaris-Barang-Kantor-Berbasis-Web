
import { useState, useEffect } from "react";
import { fetchKategori, addKategori, updateKategori, deleteKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";

const KategoriList = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", deskripsi: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      setLoading(true);
      const data = await fetchKategori();
      setKategoriList(data);
    } catch (error) {
      showErrorToast("Gagal memuat data kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama) {
      showErrorToast("Nama kategori tidak boleh kosong");
      return;
    }
    
    try {
      if (editingId) {
        await updateKategori(editingId, formData);
        showSuccessToast("Kategori berhasil diperbarui");
      } else {
        await addKategori(formData);
        showSuccessToast("Kategori berhasil ditambahkan");
      }
      
      resetForm();
      loadKategori();
    } catch (error) {
      const message = editingId ? 
        "Gagal memperbarui kategori" : 
        "Gagal menambahkan kategori";
      showErrorToast(message);
    }
  };

  const handleEdit = (kategori) => {
    setFormData({
      nama: kategori.nama,
      deskripsi: kategori.deskripsi
    });
    setEditingId(kategori.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await deleteKategori(id);
        showSuccessToast("Kategori berhasil dihapus");
        loadKategori();
      } catch (error) {
        showErrorToast(error.message || "Gagal menghapus kategori");
      }
    }
  };

  const resetForm = () => {
    setFormData({ nama: "", deskripsi: "" });
    setEditingId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Manajemen Kategori</h1>
        <p className="text-gray-600">Kelola kategori barang inventaris</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Tambah/Edit Kategori */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Kategori" : "Tambah Kategori Baru"}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-start gap-4">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Perbarui" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Daftar Kategori */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Kategori</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : (
            <div>
              {kategoriList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Nama</th>
                        <th className="py-2 px-4 text-left">Deskripsi</th>
                        <th className="py-2 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {kategoriList.map((kategori) => (
                        <tr key={kategori.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{kategori.nama}</td>
                          <td className="py-3 px-4">{kategori.deskripsi}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(kategori)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(kategori.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Belum ada data kategori
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KategoriList;
