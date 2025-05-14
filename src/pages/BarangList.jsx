
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBarang, deleteBarang, fetchKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";

const BarangList = () => {
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("nama");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const getBarang = async () => {
      try {
        setLoading(true);
        const dataBarang = await fetchBarang();
        const dataKategori = await fetchKategori();
        setBarang(dataBarang);
        setKategori(dataKategori);
      } catch (error) {
        showErrorToast("Gagal memuat data barang");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBarang();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      try {
        await deleteBarang(id);
        setBarang(barang.filter(item => item.id !== id));
        showSuccessToast("Barang berhasil dihapus");
      } catch (error) {
        showErrorToast("Gagal menghapus barang");
        console.error(error);
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getKategoriNama = (kategoriId) => {
    const found = kategori.find(k => k.id === kategoriId);
    return found ? found.nama : "Tidak ada kategori";
  };

  const filteredBarang = barang.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getKategoriNama(item.kategoriId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBarang = [...filteredBarang].sort((a, b) => {
    let valueA;
    let valueB;

    if (sortField === "kategori") {
      valueA = getKategoriNama(a.kategoriId).toLowerCase();
      valueB = getKategoriNama(b.kategoriId).toLowerCase();
    } else {
      valueA = typeof a[sortField] === "string" ? a[sortField].toLowerCase() : a[sortField];
      valueB = typeof b[sortField] === "string" ? b[sortField].toLowerCase() : b[sortField];
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Daftar Barang Inventaris</h1>
        <p className="text-gray-600">Kelola barang inventaris kantor</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Cari barang..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Link to="/tambah-barang" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Tambah Barang Baru
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left" onClick={() => handleSort("nama")}>
                    <div className="flex items-center cursor-pointer">
                      <span>Nama Barang</span>
                      {sortField === "nama" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left" onClick={() => handleSort("kategori")}>
                    <div className="flex items-center cursor-pointer">
                      <span>Kategori</span>
                      {sortField === "kategori" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left" onClick={() => handleSort("jumlah")}>
                    <div className="flex items-center cursor-pointer">
                      <span>Jumlah</span>
                      {sortField === "jumlah" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left">Kondisi</th>
                  <th className="py-3 px-4 text-left">Lokasi</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedBarang.length > 0 ? (
                  sortedBarang.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{item.nama}</td>
                      <td className="py-3 px-4">{getKategoriNama(item.kategoriId)}</td>
                      <td className="py-3 px-4">{item.jumlah}</td>
                      <td className="py-3 px-4">{item.kondisi}</td>
                      <td className="py-3 px-4">{item.lokasi}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/edit-barang/${item.id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      Tidak ada data barang yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredBarang.length > 0 && (
          <div className="mt-4 text-gray-500 text-sm">
            Menampilkan {filteredBarang.length} dari {barang.length} barang
          </div>
        )}
      </div>
    </div>
  );
};

export default BarangList;
