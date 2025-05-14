
import { useState } from "react";
import { Kategori } from "../lib/types";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import TabelKategori from "../components/TabelKategori";
import FormKategori from "../components/FormKategori";
import dataSample from "../lib/dataSample";

const DaftarKategori = () => {
  const { toast } = useToast();
  const [kategori, setKategori] = useState<Kategori[]>(dataSample.kategori);
  const [showForm, setShowForm] = useState(false);
  const [editKategori, setEditKategori] = useState<Kategori | undefined>(undefined);

  const handleTambahKategori = () => {
    setEditKategori(undefined);
    setShowForm(true);
  };

  const handleEditKategori = (kategori: Kategori) => {
    setEditKategori(kategori);
    setShowForm(true);
  };

  const handleHapusKategori = (id: string) => {
    const barangUsingKategori = dataSample.barang.some((barang) => barang.kategoriId === id);
    
    if (barangUsingKategori) {
      toast({
        title: "Tidak Dapat Menghapus Kategori",
        description: "Kategori ini sedang digunakan oleh beberapa barang. Ubah kategori barang terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      const updatedKategori = kategori.filter((item) => item.id !== id);
      setKategori(updatedKategori);
      
      dataSample.kategori = updatedKategori;
      
      toast({
        title: "Kategori Berhasil Dihapus",
        description: "Data kategori telah berhasil dihapus dari sistem.",
      });
    }
  };
  
  const handleSimpanKategori = (kategoriData: Omit<Kategori, "id">) => {
    if (editKategori) {
      const updatedKategori = kategori.map((item) =>
        item.id === editKategori.id
          ? { ...item, ...kategoriData }
          : item
      );
      
      setKategori(updatedKategori);
      dataSample.kategori = updatedKategori;
      
      toast({
        title: "Kategori Berhasil Diperbarui",
        description: `Kategori ${kategoriData.nama} telah diperbarui.`,
      });
    } else {
      const newKategori: Kategori = {
        id: Date.now().toString(),
        ...kategoriData,
      };
      
      const updatedKategori = [...kategori, newKategori];
      setKategori(updatedKategori);
      dataSample.kategori = updatedKategori;
      
      toast({
        title: "Kategori Berhasil Ditambahkan",
        description: `Kategori ${kategoriData.nama} telah ditambahkan.`,
      });
    }
    
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Manajemen Kategori Barang
          </h1>
          <button
            onClick={handleTambahKategori}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Tambah Kategori
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editKategori ? "Edit Kategori" : "Tambah Kategori Baru"}
            </h2>
            <FormKategori
              initialData={editKategori}
              onSubmit={handleSimpanKategori}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TabelKategori
          kategori={kategori}
          onEdit={handleEditKategori}
          onDelete={handleHapusKategori}
        />
      </main>
    </div>
  );
};

export default DaftarKategori;
