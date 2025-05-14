
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">SisInv</Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/barang" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/barang')}`}>
                  Daftar Barang
                </Link>
                <Link to="/tambah-barang" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/tambah-barang')}`}>
                  Tambah Barang
                </Link>
                <Link to="/kategori" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/kategori')}`}>
                  Kategori
                </Link>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/barang" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Daftar Barang
          </Link>
          <Link to="/tambah-barang" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Tambah Barang
          </Link>
          <Link to="/kategori" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Kategori
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
