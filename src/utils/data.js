

// Data barang simulasi
let barangData = JSON.parse(localStorage.getItem("barangData")) || [
  {
    id: 1,
    nama: "Laptop Asus A412DA",
    kategoriId: 1,
    jumlah: 5,
    kondisi: "Baik",
    tanggalMasuk: "2023-01-15",
    lokasi: "Ruang IT",
    keterangan: "Laptop untuk tim developer"
  },
  {
    id: 2,
    nama: "Meja Kerja Kayu",
    kategoriId: 2,
    jumlah: 10,
    kondisi: "Baik",
    tanggalMasuk: "2023-02-20",
    lokasi: "Ruang Staff",
    keterangan: "Meja kerja untuk staff administrasi"
  },
  {
    id: 3,
    nama: "Kursi Ergonomis",
    kategoriId: 2,
    jumlah: 15,
    kondisi: "Baik",
    tanggalMasuk: "2023-02-20",
    lokasi: "Ruang Staff",
    keterangan: "Kursi kerja nyaman untuk penggunaan jangka panjang"
  },
  {
    id: 4,
    nama: "Printer Epson L3110",
    kategoriId: 1,
    jumlah: 3,
    kondisi: "Baik",
    tanggalMasuk: "2023-03-05",
    lokasi: "Ruang Administrasi",
    keterangan: "Printer multifungsi untuk kebutuhan cetak dokumen"
  },
  {
    id: 5,
    nama: "AC Panasonic 1PK",
    kategoriId: 3,
    jumlah: 8,
    kondisi: "Baik",
    tanggalMasuk: "2023-01-10",
    lokasi: "Seluruh Ruangan",
    keterangan: "Pendingin ruangan untuk kenyamanan kerja"
  }
];

// Data kategori simulasi
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [
  { id: 1, nama: "Elektronik", deskripsi: "Perangkat elektronik seperti komputer, printer, dll" },
  { id: 2, nama: "Furniture", deskripsi: "Perabot kantor seperti meja, kursi, lemari, dll" },
  { id: 3, nama: "Perlengkapan", deskripsi: "Perlengkapan kantor lainnya" }
];

// Simulasi API untuk data barang
export const fetchBarang = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...barangData]);
    }, 500);
  });
};

export const fetchBarangById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const barang = barangData.find(item => item.id === Number(id));
      if (barang) {
        resolve({...barang});
      } else {
        reject(new Error("Barang tidak ditemukan"));
      }
    }, 500);
  });
};

export const addBarang = (barang) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBarang = {
        ...barang,
        id: barangData.length > 0 ? Math.max(...barangData.map(b => b.id)) + 1 : 1
      };
      barangData.push(newBarang);
      localStorage.setItem("barangData", JSON.stringify(barangData)); 
      resolve(newBarang);
    }, 500);
  });
};

export const updateBarang = (id, barang) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = barangData.findIndex(item => item.id === Number(id));
      if (index !== -1) {
        barangData[index] = { ...barang, id: Number(id) };
        localStorage.setItem("barangData", JSON.stringify(barangData));
        resolve(barangData[index]);
      } else {
        reject(new Error("Barang tidak ditemukan"));
      }
    }, 500);
  });
};

export const deleteBarang = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = barangData.findIndex(item => item.id === Number(id));
      if (index !== -1) {
        barangData.splice(index, 1);
        localStorage.setItem("barangData", JSON.stringify(barangData));
        resolve({ success: true });
      } else {
        reject(new Error("Barang tidak ditemukan"));
      }
    }, 500);
  });
};

// Simulasi API untuk data kategori
export const fetchKategori = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...kategoriData]);
    }, 500);
  });
};

export const fetchKategoriById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const kategori = kategoriData.find(item => item.id === Number(id));
      if (kategori) {
        resolve({...kategori});
      } else {
        reject(new Error("Kategori tidak ditemukan"));
      }
    }, 500);
  });
};

export const addKategori = (kategori) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newKategori = {
        ...kategori,
        id: kategoriData.length > 0 ? Math.max(...kategoriData.map(k => k.id)) + 1 : 1
      };
      kategoriData.push(newKategori);
      localStorage.setItem("kategoriData", JSON.stringify(kategoriData)); 
      resolve(newKategori);
    }, 500);
  });
};

export const updateKategori = (id, kategori) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = kategoriData.findIndex(item => item.id === Number(id));
      if (index !== -1) {
        kategoriData[index] = { ...kategori, id: Number(id) };
        localStorage.setItem("kategoriData", JSON.stringify(kategoriData)); // <-- Tambahkan baris ini
        resolve(kategoriData[index]);
      } else {
        reject(new Error("Kategori tidak ditemukan"));
      }
    }, 500);
  });
};

export const deleteKategori = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = kategoriData.findIndex(item => item.id === Number(id));
      if (index !== -1) {
        // Cek apakah kategori sedang digunakan oleh barang
        const barangDenganKategori = barangData.filter(item => item.kategoriId === Number(id));
        if (barangDenganKategori.length > 0) {
          reject(new Error("Kategori sedang digunakan oleh barang"));
          return;
        }
        
        kategoriData.splice(index, 1);
        localStorage.setItem("kategoriData", JSON.stringify(kategoriData)); 
        resolve({ success: true });
      } else {
        reject(new Error("Kategori tidak ditemukan"));
      }
    }, 500);
  });
};

// Simulasi data user
let userData = JSON.parse(localStorage.getItem("userData")) || [
  { id: 1, name: "Admin", email: "admin@inventaris.com", password: "admin123" }
];

export const registerUser = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.find(u => u.email === user.email)) {
        reject(new Error("Email sudah terdaftar"));
      } else {
        const newUser = { ...user, id: userData.length + 1 };
        userData.push(newUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        resolve(newUser);
      }
    }, 500);
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userData.find(u => u.email === email && u.password === password);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Email atau password salah"));
      }
    }, 1500);
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Password tidak cocok!");
    return;
  }
  setIsLoading(true);
  try {
    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });
    alert("Registrasi berhasil! Silakan login.");
    onClose();
  } catch (err) {
    alert(err.message || "Registrasi gagal");
  } finally {
    setIsLoading(false);
  }
};
