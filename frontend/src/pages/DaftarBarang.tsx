
import { useState } from "react";
import { Barang } from "../lib/types";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import TabelBarang from "../components/TabelBarang";
import dataSample from "../lib/dataSample";

const DaftarBarang = () => {
  const { toast } = useToast();
  const [barang, setBarang] = useState<Barang[]>(dataSample.barang);

  const handleHapusBarang = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      const updatedBarang = barang.filter((item) => item.id !== id);
      setBarang(updatedBarang);
      
      toast({
        title: "Barang Berhasil Dihapus",
        description: "Data barang telah berhasil dihapus dari sistem.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Daftar Barang Inventaris
          </h1>
        </div>

        <TabelBarang barang={barang} onDelete={handleHapusBarang} />
      </main>
    </div>
  );
};

export default DaftarBarang;
