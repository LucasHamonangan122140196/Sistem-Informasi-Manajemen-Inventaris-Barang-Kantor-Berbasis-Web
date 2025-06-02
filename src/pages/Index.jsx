
import { Package, Plus, List, Settings, TrendingUp, Users, Clock, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

  const closeAllModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setForgotPasswordModalOpen(false);
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setForgotPasswordModalOpen(false);
    setLoginModalOpen(true);
  };

  const switchToForgotPassword = () => {
    setLoginModalOpen(false);
    setForgotPasswordModalOpen(true);
  };

  const features = [
    {
      icon: List,
      title: "Daftar Barang",
      description: "Lihat dan kelola semua barang inventaris yang terdaftar dalam sistem dengan mudah",
      link: "/barang",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      icon: Plus,
      title: "Tambah Barang",
      description: "Tambahkan barang baru ke dalam sistem inventaris dengan form yang mudah digunakan",
      link: "/tambah-barang",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100"
    },
    {
      icon: Settings,
      title: "Kelola Kategori",
      description: "Atur dan kelola kategori barang untuk pengorganisasian yang lebih baik dan efisien",
      link: "/kategori",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ];

  const stats = [
    { icon: TrendingUp, label: "Efisiensi", value: "95%", color: "text-green-600" },
    { icon: Users, label: "Pengguna", value: "150+", color: "text-blue-600" },
    { icon: Clock, label: "Uptime", value: "99.9%", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto py-8 md:py-16 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 md:p-4 rounded-full shadow-lg">
                <Package className="h-8 w-8 md:h-12 md:w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 md:mb-6">
              Sistem Inventaris Barang Kantor
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4">
              Kelola inventaris kantor Anda dengan mudah, efisien, dan terpadu. 
              Sistem modern yang dirancang untuk produktivitas maksimal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 px-4">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <LogIn className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Masuk ke Akun
              </button>
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="inline-flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <UserPlus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Daftar Sekarang
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color} mx-auto mb-2 md:mb-3`} />
                  <div className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 md:py-16 px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Jelajahi berbagai fitur powerful yang tersedia untuk mengelola inventaris kantor Anda
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className={`group ${feature.bgColor} ${feature.borderColor} border-2 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
            >
              <div className="text-center">
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:underline`}>
                  Mulai Sekarang →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Siap Memulai?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Bergabunglah dengan ratusan perusahaan yang telah mempercayai sistem kami untuk mengelola inventaris mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="inline-flex items-center justify-center bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Daftar Gratis
            </button>
            <Link
              to="/tambah-barang"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Coba Demo
            </Link>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={closeAllModals}
        onSwitchToRegister={switchToRegister}
        onSwitchToForgotPassword={switchToForgotPassword}
      />
      <RegisterModal 
        isOpen={registerModalOpen} 
        onClose={closeAllModals}
        onSwitchToLogin={switchToLogin}
      />
      <ForgotPasswordModal 
        isOpen={forgotPasswordModalOpen} 
        onClose={closeAllModals}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
};

export default Index;
