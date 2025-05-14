
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Barang, Kategori } from "../lib/types";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import dataSample from "../lib/dataSample";

const Index = () => {
  const { toast } = useToast();
  const [barang, setBarang] = useState<Barang[]>(dataSample.barang);
  const [kategori, setKategori] = useState<Kategori[]>(dataSample.kategori);
  
  const totalBarang = barang.length;
  const totalKategori = kategori.length;
  const totalBarangBaik = barang.filter(item => item.kondisi === "Baik").length;
  const totalBarangRusakRingan = barang.filter(item => item.kondisi === "Rusak Ringan").length;
  const totalBarangRusakBerat = barang.filter(item => item.kondisi === "Rusak Berat").length;

  useEffect(() => {
    toast({
      title: "Aplikasi Siap Digunakan",
      description: `Selamat datang di Sistem Informasi Manajemen Inventaris Barang Kantor!`,
    });
  }, []);

  const barangTerbaru = [...barang]
    .sort((a, b) => new Date(b.tanggalPerolehan).getTime() - new Date(a.tanggalPerolehan).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 relative">
            Sistem Informasi Manajemen Inventaris Barang Kantor
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-purple-500"></span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 transform transition-all hover:translate-y-[-5px] hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Barang</h2>
            <p className="text-3xl font-bold text-purple-600">{totalBarang}</p>
            <Link to="/barang" className="text-purple-600 hover:underline mt-2 inline-block">
              Lihat Semua
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 transform transition-all hover:translate-y-[-5px] hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Kategori</h2>
            <p className="text-3xl font-bold text-blue-600">{totalKategori}</p>
            <Link to="/kategori" className="text-blue-600 hover:underline mt-2 inline-block">
              Kelola Kategori
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 transform transition-all hover:translate-y-[-5px] hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Status Barang</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium">Baik: {totalBarangBaik}</p>
                <p className="text-amber-600 font-medium">Rusak Ringan: {totalBarangRusakRingan}</p>
                <p className="text-red-600 font-medium">Rusak Berat: {totalBarangRusakBerat}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <span className="w-2 h-6 bg-purple-500 mr-3 rounded-sm"></span>
            Barang Terbaru
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                    Kode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                    Nama Barang
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {barangTerbaru.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.kodeBarang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.namaBarang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.kategoriNama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.jumlah} {item.satuan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.tanggalPerolehan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}

                {barangTerbaru.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Belum ada data barang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/barang"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium group flex items-center"
            >
              Lihat Semua Barang 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <span className="w-2 h-6 bg-blue-500 mr-3 rounded-sm"></span>
            Menu Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/barang"
              className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-lg flex flex-col items-center justify-center transition-all duration-200 border border-gray-100 shadow-sm"
            >
              <span className="text-xl text-purple-700 font-semibold mb-2">Daftar Barang</span>
              <span className="text-sm text-gray-600">Lihat dan kelola semua barang</span>
            </Link>
            <Link
              to="/barang/tambah"
              className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg flex flex-col items-center justify-center transition-all duration-200 border border-gray-100 shadow-sm"
            >
              <span className="text-xl text-blue-700 font-semibold mb-2">Tambah Barang</span>
              <span className="text-sm text-gray-600">Catat barang baru</span>
            </Link>
            <Link
              to="/kategori"
              className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100 rounded-lg flex flex-col items-center justify-center transition-all duration-200 border border-gray-100 shadow-sm"
            >
              <span className="text-xl text-indigo-700 font-semibold mb-2">Kategori</span>
              <span className="text-sm text-gray-600">Kelola kategori barang</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
