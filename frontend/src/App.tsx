
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DaftarBarang from "./pages/DaftarBarang";
import TambahBarang from "./pages/TambahBarang";
import EditBarang from "./pages/EditBarang";
import DaftarKategori from "./pages/DaftarKategori";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/barang" element={<DaftarBarang />} />
          <Route path="/barang/tambah" element={<TambahBarang />} />
          <Route path="/barang/edit/:id" element={<EditBarang />} />
          <Route path="/kategori" element={<DaftarKategori />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
