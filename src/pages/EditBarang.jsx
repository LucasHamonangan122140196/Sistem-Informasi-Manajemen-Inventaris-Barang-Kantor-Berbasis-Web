
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBarangById, updateBarang, fetchKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";

const EditBarang = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    kategoriId: "",
    jumlah: 1,
    kondisi: "Baik",
    tanggalMasuk: "",
    lokasi: "",
    keterangan: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [barang, kategori] = await Promise.all([
          fetchBarangById(id),
          fetchKategori()
        ]);
        setFormData(barang);
        setKategoriList(kategori);
      } catch (error) {
        showErrorToast("Gagal memuat data barang");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "kategoriId" || name === "jumlah" ? Number(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.kategoriId || !formData.lokasi) {
      showErrorToast("Mohon lengkapi form dengan benar");
      return;
    }
    
    try {
      setSaving(true);
      await updateBarang(id, formData);
      showSuccessToast("Barang berhasil diperbarui");
      navigate("/");
    } catch (error) {
      showErrorToast("Gagal memperbarui barang");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Edit Barang</h1>
        <p className="text-gray-600 text-sm md:text-base">Perbarui informasi barang inventaris</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Barang
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                name="kategoriId"
                value={formData.kategoriId}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              >
                <option value="">Pilih Kategori</option>
                {kategoriList.map(kategori => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah
              </label>
              <input
                type="number"
                name="jumlah"
                min="1"
                value={formData.jumlah}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kondisi
              </label>
              <select
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
              >
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Masuk
              </label>
              <input
                type="date"
                name="tanggalMasuk"
                value={formData.tanggalMasuk}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keterangan
              </label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {saving ? "Menyimpan..." : "Perbarui Barang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBarang;
