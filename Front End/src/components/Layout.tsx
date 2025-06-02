
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 - Sistem Inventaris Barang Kantor
        </div>
      </footer>
    </div>
  );
};

export default Layout;
