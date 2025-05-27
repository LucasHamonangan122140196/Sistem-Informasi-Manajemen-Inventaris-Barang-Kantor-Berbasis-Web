
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-semibold mb-3">Sistem Inventaris</h3>
              <p className="text-gray-400 text-sm">
                Solusi modern untuk pengelolaan inventaris kantor yang efisien dan terpadu.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Fitur</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Manajemen Barang</li>
                <li>Kategori Produk</li>
                <li>Laporan Real-time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Kontak</h3>
              <p className="text-gray-400 text-sm">
                Email: admin@inventaris.com<br />
                Tel: +62 123 456 789
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 - Sistem Inventaris Barang Kantor. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
