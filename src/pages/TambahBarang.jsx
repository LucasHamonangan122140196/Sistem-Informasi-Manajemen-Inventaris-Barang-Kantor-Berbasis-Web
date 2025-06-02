
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBarang, fetchKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const TambahBarang = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    kategoriId: "",
    jumlah: 1,
    kondisi: "Baik",
    tanggalMasuk: new Date().toISOString().split("T")[0],
    lokasi: "",
    keterangan: ""
  });

  useEffect(() => {
    const getKategori = async () => {
      try {
        const data = await fetchKategori();
        setKategoriList(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, kategoriId: data[0].id }));
        }
      } catch (error) {
        showErrorToast("Gagal memuat data kategori");
      }
    };

    getKategori();
  }, []);

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
      setLoading(true);
      await addBarang(formData);
      showSuccessToast("Barang berhasil ditambahkan");
      navigate("/");
    } catch (error) {
      console.error("Error saat menambahkan barang:", error);
      showErrorToast("Gagal menambahkan barang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl md:text-2xl">Tambah Barang Baru</CardTitle>
          <CardDescription className="text-sm md:text-base">Isi formulir untuk menambahkan barang ke inventaris</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
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
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? "Menyimpan..." : "Simpan Barang"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TambahBarang;
