
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Barang } from "../lib/types";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import FormBarang from "../components/FormBarang";
import dataSample from "../lib/dataSample";

const EditBarang = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [barang, setBarang] = useState<Barang | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundBarang = dataSample.barang.find((item) => item.id === id);
      
      if (foundBarang) {
        setBarang(foundBarang);
      } else {
        toast({
          title: "Barang Tidak Ditemukan",
          description: "Data barang yang dicari tidak ditemukan atau telah dihapus.",
          variant: "destructive"
        });
        navigate("/barang");
      }
      
      setIsLoadingData(false);
    }, 300);
  }, [id, navigate]);

  const handleSubmit = (barangData: Omit<Barang, "id" | "kategoriNama">) => {
    if (!barang) return;
    
    setIsLoading(true);
    
    try {
      setTimeout(() => {
        const kategori = dataSample.kategori.find(k => k.id === barangData.kategoriId);
        
        if (!kategori) {
          throw new Error("Kategori tidak ditemukan");
        }
        
        const updatedBarang: Barang = {
          id: barang.id,
          ...barangData,
          kategoriNama: kategori.nama
        };
        
        const barangIndex = dataSample.barang.findIndex(item => item.id === barang.id);
        if (barangIndex !== -1) {
          dataSample.barang[barangIndex] = updatedBarang;
        }
        
        toast({
          title: "Berhasil Memperbarui Barang",
          description: `Data barang ${barangData.namaBarang} telah diperbarui.`,
        });
        
        navigate("/barang");
      }, 500);
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Barang",
        description: "Terjadi kesalahan saat memperbarui data barang. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-600">Memuat data barang...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!barang) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600">Barang Tidak Ditemukan</h2>
              <p className="text-gray-600 mt-2">
                Data barang yang dicari tidak ditemukan atau telah dihapus.
              </p>
              <button
                onClick={() => navigate("/barang")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kembali ke Daftar Barang
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Barang</h1>
          <p className="text-gray-600">
            Ubah informasi barang berikut ini sesuai dengan kebutuhan.
          </p>
        </div>

        <FormBarang 
          initialData={barang}
          kategori={dataSample.kategori} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default EditBarang;
