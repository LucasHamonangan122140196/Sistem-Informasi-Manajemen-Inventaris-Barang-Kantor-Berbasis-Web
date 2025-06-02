
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="md:col-span-2">
              <h3 className="text-white font-bold text-xl mb-4">Sistem Inventaris Kantor</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Solusi modern untuk pengelolaan inventaris kantor yang efisien, terpadu, dan mudah digunakan. 
                Dirancang khusus untuk meningkatkan produktivitas dan efisiensi operasional perusahaan.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Fitur Utama</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="hover:text-white transition-colors cursor-pointer">📦 Manajemen Barang</li>
                <li className="hover:text-white transition-colors cursor-pointer">🏷️ Kategori Produk</li>
                <li className="hover:text-white transition-colors cursor-pointer">📊 Laporan Real-time</li>
                <li className="hover:text-white transition-colors cursor-pointer">🔒 Sistem Keamanan</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <p className="hover:text-white transition-colors">
                  📧 admin@inventaris.com
                </p>
                <p className="hover:text-white transition-colors">
                  📱 +62 123 456 789
                </p>
                <p className="hover:text-white transition-colors">
                  🏢 Jakarta, Indonesia
                </p>
                <p className="hover:text-white transition-colors">
                  🕒 24/7 Support
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Sistem Inventaris Barang Kantor. Semua hak dilindungi undang-undang.
              </p>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                <a href="#" className="hover:text-white transition-colors">Bantuan</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
