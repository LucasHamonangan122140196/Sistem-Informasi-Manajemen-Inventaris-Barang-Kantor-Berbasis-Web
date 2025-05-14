
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Barang } from "../lib/types";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import FormBarang from "../components/FormBarang";
import dataSample from "../lib/dataSample";

const TambahBarang = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (barangData: Omit<Barang, "id" | "kategoriNama">) => {
    setIsLoading(true);
    
    try {
      setTimeout(() => {
        const kategori = dataSample.kategori.find(k => k.id === barangData.kategoriId);
        
        if (!kategori) {
          throw new Error("Kategori tidak ditemukan");
        }
        
        const newBarang: Barang = {
          id: Date.now().toString(),
          ...barangData,
          kategoriNama: kategori.nama
        };
        
        dataSample.barang.push(newBarang);
        
        toast({
          title: "Berhasil Menambahkan Barang",
          description: `Barang ${barangData.namaBarang} telah ditambahkan ke inventaris.`,
        });
        
        navigate("/barang");
      }, 500);
    } catch (error) {
      toast({
        title: "Gagal Menambahkan Barang",
        description: "Terjadi kesalahan saat menambahkan barang. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tambah Barang Baru</h1>
          <p className="text-gray-600">
            Isi formulir di bawah ini untuk menambahkan barang baru ke sistem inventaris.
          </p>
        </div>

        <FormBarang 
          kategori={dataSample.kategori} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default TambahBarang;
