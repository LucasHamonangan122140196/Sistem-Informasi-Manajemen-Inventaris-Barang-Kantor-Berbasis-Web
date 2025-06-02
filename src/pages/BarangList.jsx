
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBarang, deleteBarang, fetchKategori } from "../utils/data";
import { showSuccessToast, showErrorToast } from "../components/Alert";
import { Search, Plus, ArrowUp, ArrowDown, Edit, Trash } from "lucide-react";

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

  const getStatusBadge = (kondisi) => {
    switch (kondisi) {
      case 'Baik':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Baik</span>;
      case 'Rusak Ringan':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Rusak Ringan</span>;
      case 'Rusak Berat':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rusak Berat</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{kondisi}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
        <div>
          <h1 className="section-header text-3xl font-bold mb-2">Daftar Barang Inventaris</h1>
          <p className="text-muted-foreground">Kelola barang inventaris kantor Anda dengan mudah</p>
        </div>

        <Link 
          to="/tambah-barang" 
          className="btn-gradient rounded-lg py-2 px-4 flex items-center justify-center gap-2 shadow-lg hover-scale"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Barang</span>
        </Link>
      </div>

      <div className="card-gradient rounded-xl shadow-lg p-6 border border-primary/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari barang..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer hover:bg-primary/5" 
                    onClick={() => handleSort("nama")}
                  >
                    <div className="flex items-center">
                      <span>Nama Barang</span>
                      {sortField === "nama" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer hover:bg-primary/5" 
                    onClick={() => handleSort("kategori")}
                  >
                    <div className="flex items-center">
                      <span>Kategori</span>
                      {sortField === "kategori" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer hover:bg-primary/5" 
                    onClick={() => handleSort("jumlah")}
                  >
                    <div className="flex items-center">
                      <span>Jumlah</span>
                      {sortField === "jumlah" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
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
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium">{item.nama}</td>
                      <td className="py-4 px-4">{getKategoriNama(item.kategoriId)}</td>
                      <td className="py-4 px-4">{item.jumlah}</td>
                      <td className="py-4 px-4">{getStatusBadge(item.kondisi)}</td>
                      <td className="py-4 px-4">{item.lokasi}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/edit-barang/${item.id}`}
                            className="bg-amber-500 text-white p-1.5 rounded-md hover:bg-amber-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg">Tidak ada data barang yang ditemukan</span>
                      </div>
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
