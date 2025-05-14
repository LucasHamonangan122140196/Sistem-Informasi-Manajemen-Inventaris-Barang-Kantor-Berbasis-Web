
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl tracking-tight">SIMIB</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "bg-indigo-900 px-3 py-2 rounded-md text-sm font-medium" : "px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors duration-200"
                  }
                  end
                >
                  Beranda
                </NavLink>
                <NavLink 
                  to="/barang" 
                  className={({ isActive }) => 
                    isActive ? "bg-indigo-900 px-3 py-2 rounded-md text-sm font-medium" : "px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors duration-200"
                  }
                >
                  Daftar Barang
                </NavLink>
                <NavLink 
                  to="/kategori" 
                  className={({ isActive }) => 
                    isActive ? "bg-indigo-900 px-3 py-2 rounded-md text-sm font-medium" : "px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors duration-200"
                  }
                >
                  Kategori
                </NavLink>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleNavbar} 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-500 focus:outline-none transition-colors duration-200"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "bg-indigo-900 block px-3 py-2 rounded-md text-base font-medium" : "block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 transition-colors duration-200"
              }
              end
              onClick={toggleNavbar}
            >
              Beranda
            </NavLink>
            <NavLink 
              to="/barang" 
              className={({ isActive }) => 
                isActive ? "bg-indigo-900 block px-3 py-2 rounded-md text-base font-medium" : "block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 transition-colors duration-200"
              }
              onClick={toggleNavbar}
            >
              Daftar Barang
            </NavLink>
            <NavLink 
              to="/kategori" 
              className={({ isActive }) => 
                isActive ? "bg-indigo-900 block px-3 py-2 rounded-md text-base font-medium" : "block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 transition-colors duration-200"
              }
              onClick={toggleNavbar}
            >
              Kategori
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
