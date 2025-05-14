
import { useState, useEffect } from "react";
import { Barang } from "../lib/types";
import { Link } from "react-router-dom";

interface TabelBarangProps {
  barang: Barang[];
  onDelete: (id: string) => void;
}

const TabelBarang = ({ barang, onDelete }: TabelBarangProps) => {
  const [filterKata, setFilterKata] = useState("");
  const [sortField, setSortField] = useState<keyof Barang>("namaBarang");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [dataFiltered, setDataFiltered] = useState<Barang[]>(barang);

  useEffect(() => {
    let filtered = [...barang];
    
    if (filterKata) {
      filtered = filtered.filter(item => 
        item.namaBarang.toLowerCase().includes(filterKata.toLowerCase()) ||
        item.kodeBarang.toLowerCase().includes(filterKata.toLowerCase()) ||
        item.kategoriNama.toLowerCase().includes(filterKata.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(filterKata.toLowerCase())
      );
    }
    
    filtered = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    
    setDataFiltered(filtered);
  }, [barang, filterKata, sortField, sortDirection]);

  const ubahUrutan = (field: keyof Barang) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari barang..."
              className="pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full md:w-64"
              value={filterKata}
              onChange={(e) => setFilterKata(e.target.value)}
            />
          </div>
          <div>
            <Link 
              to="/barang/tambah" 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tambah Barang
            </Link>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("kodeBarang")}>
                <div className="flex items-center">
                  Kode Barang
                  {sortField === "kodeBarang" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("namaBarang")}>
                <div className="flex items-center">
                  Nama Barang
                  {sortField === "namaBarang" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("kategoriNama")}>
                <div className="flex items-center">
                  Kategori
                  {sortField === "kategoriNama" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("jumlah")}>
                <div className="flex items-center">
                  Jumlah
                  {sortField === "jumlah" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("kondisi")}>
                <div className="flex items-center">
                  Kondisi
                  {sortField === "kondisi" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => ubahUrutan("lokasi")}>
                <div className="flex items-center">
                  Lokasi
                  {sortField === "lokasi" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {dataFiltered.length > 0 ? (
              dataFiltered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{item.kodeBarang}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.namaBarang}</td>
                  <td className="px-6 py-4">{item.kategoriNama}</td>
                  <td className="px-6 py-4">{item.jumlah} {item.satuan}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${
                      item.kondisi === "Baik" ? "bg-green-100 text-green-800" :
                      item.kondisi === "Rusak Ringan" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {item.kondisi}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.lokasi}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/barang/edit/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 font-medium transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p>Tidak ada data barang</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelBarang;
