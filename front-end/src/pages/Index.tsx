
const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sistem Inventaris Barang Kantor</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Daftar Barang</h2>
              <p className="text-gray-600 mb-4">Lihat dan kelola semua barang inventaris yang terdaftar dalam sistem</p>
              <a href="/barang" className="text-blue-600 hover:text-blue-800 font-medium">Lihat Daftar →</a>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-green-700 mb-2">Tambah Barang</h2>
              <p className="text-gray-600 mb-4">Tambahkan barang baru ke dalam sistem inventaris</p>
              <a href="/tambah-barang" className="text-green-600 hover:text-green-800 font-medium">Tambah Barang →</a>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-purple-700 mb-2">Kategori</h2>
              <p className="text-gray-600 mb-4">Kelola kategori barang untuk pengorganisasian yang lebih baik</p>
              <a href="/kategori" className="text-purple-600 hover:text-purple-800 font-medium">Kelola Kategori →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
