
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute -top-4 -right-4">
            <Search className="h-12 w-12 text-blue-400 animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              Kembali ke Beranda
            </Link>
            
            <div className="text-gray-400">atau</div>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Halaman Sebelumnya
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          Jika masalah berlanjut, silakan hubungi administrator sistem.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
