
import { useState, useEffect } from "react";
import { fetchKategori, addKategori, updateKategori, deleteKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";
import { Edit, Trash, Plus, Save } from "lucide-react";

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
    <div className="space-y-6 animate-fade-in px-4">
      <div>
        <h1 className="section-header text-2xl md:text-3xl font-bold mb-2">Manajemen Kategori</h1>
        <p className="text-muted-foreground text-sm md:text-base">Kelola kategori barang inventaris agar lebih terorganisir</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="card-gradient rounded-xl shadow-lg p-4 md:p-6 border border-primary/10">
          <div className="flex items-center mb-4 md:mb-6">
            <div className="p-2 bg-primary/10 rounded-full mr-3">
              {editingId ? (
                <Edit className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              ) : (
                <Plus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              )}
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-primary">
              {editingId ? "Edit Kategori" : "Tambah Kategori Baru"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm md:text-base"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm md:text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-4">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto btn-gradient rounded-lg px-4 py-2 flex items-center justify-center gap-2 text-sm"
              >
                <Save className="h-4 w-4" />
                {editingId ? "Perbarui" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="card-gradient rounded-xl shadow-lg p-4 md:p-6 border border-primary/10">
          <div className="flex items-center mb-4 md:mb-6">
            <div className="p-2 bg-primary/10 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-primary">Daftar Kategori</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              {kategoriList.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header">
                      <tr>
                        <th className="py-2 md:py-3 px-3 md:px-4 text-left text-sm">Nama</th>
                        <th className="py-2 md:py-3 px-3 md:px-4 text-left text-sm">Deskripsi</th>
                        <th className="py-2 md:py-3 px-3 md:px-4 text-center text-sm">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {kategoriList.map((kategori) => (
                        <tr key={kategori.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-2 md:py-3 px-3 md:px-4 font-medium text-sm">{kategori.nama}</td>
                          <td className="py-2 md:py-3 px-3 md:px-4 text-sm">{kategori.deskripsi || "-"}</td>
                          <td className="py-2 md:py-3 px-3 md:px-4 text-center">
                            <div className="flex justify-center space-x-1 md:space-x-2">
                              <button
                                onClick={() => handleEdit(kategori)}
                                className="bg-amber-500 text-white p-1 md:p-1.5 rounded-md hover:bg-amber-600 transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-3 w-3 md:h-4 md:w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(kategori.id)}
                                className="bg-red-500 text-white p-1 md:p-1.5 rounded-md hover:bg-red-600 transition-colors"
                                title="Hapus"
                              >
                                <Trash className="h-3 w-3 md:h-4 md:w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white/50 rounded-lg border border-gray-200 p-6 md:p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-base md:text-lg text-gray-500">Belum ada data kategori</span>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Tambahkan kategori baru menggunakan form di sebelah kiri
                    </p>
                  </div>
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
