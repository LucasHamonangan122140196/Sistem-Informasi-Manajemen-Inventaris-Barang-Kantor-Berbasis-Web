
import { useState, useEffect } from "react";
import { Kategori } from "../lib/types";

interface TabelKategoriProps {
  kategori: Kategori[];
  onEdit: (kategori: Kategori) => void;
  onDelete: (id: string) => void;
}

const TabelKategori = ({ kategori, onEdit, onDelete }: TabelKategoriProps) => {
  const [filterKata, setFilterKata] = useState("");
  const [dataFiltered, setDataFiltered] = useState<Kategori[]>(kategori);

  useEffect(() => {
    let filtered = [...kategori];
    
    if (filterKata) {
      filtered = filtered.filter(item => 
        item.nama.toLowerCase().includes(filterKata.toLowerCase()) ||
        (item.keterangan && item.keterangan.toLowerCase().includes(filterKata.toLowerCase()))
      );
    }
    
    setDataFiltered(filtered);
  }, [kategori, filterKata]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari kategori..."
              className="pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={filterKata}
              onChange={(e) => setFilterKata(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Nama Kategori</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Keterangan</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {dataFiltered.length > 0 ? (
              dataFiltered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{item.keterangan || "-"}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                    >
                      Edit
                    </button>
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
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <p>Tidak ada data kategori</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelKategori;
