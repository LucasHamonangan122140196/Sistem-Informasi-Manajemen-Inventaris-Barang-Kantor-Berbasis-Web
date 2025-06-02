import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../utils/data"; // tambahkan import ini

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const user = await loginUser(email, password);
      // Simpan user ke state/context jika perlu
      alert("Login berhasil!");
      onClose();
      setEmail("");
      setPassword("");
      // Anda bisa set user ke context atau localStorage di sini
    } catch (err) {
      setError(err.message || "Login gagal");
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const isAdminEmail = email.includes('admin');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className={`${isAdminEmail ? 'bg-gradient-to-r from-red-600 to-orange-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            {isAdminEmail ? (
              <Shield className="h-8 w-8 text-white" />
            ) : (
              <User className="h-8 w-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isAdminEmail ? 'Admin Login' : 'Masuk ke Akun'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isAdminEmail ? 'Portal Administrator' : 'Selamat datang kembali!'}
          </p>
          {isAdminEmail && (
            <div className="mt-2 inline-flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
              <Shield size={14} className="mr-1" />
              Administrator
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="nama@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAdminEmail 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isLoading ? "Memproses..." : isAdminEmail ? "Login sebagai Admin" : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={onSwitchToForgotPassword}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Lupa Password?
          </button>
          
          <div className="text-gray-600 text-sm">
            Belum punya akun?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>

          {isAdminEmail && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-700 text-xs">
                ⚠️ Akses administrator memberikan kontrol penuh atas sistem
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
