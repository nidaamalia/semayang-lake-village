import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import Index from "./pages/Index";
import TentangDesa from "./pages/TentangDesa";
import WisataPage from "./pages/WisataPage";
import KulinerPage from "./pages/KulinerPage";
import PenginapanPage from "./pages/PenginapanPage";
import BeritaPage from "./pages/BeritaPage";
import GaleriPage from "./pages/GaleriPage";
import KontakPage from "./pages/KontakPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBerita from "./pages/admin/AdminBerita";
import AdminWisata from "./pages/admin/AdminWisata";
import AdminGaleri from "./pages/admin/AdminGaleri";
import AdminPerangkat from "./pages/admin/AdminPerangkat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/tentang" element={<TentangDesa />} />
            <Route path="/wisata" element={<WisataPage />} />
            <Route path="/kuliner" element={<KulinerPage />} />
            <Route path="/penginapan" element={<PenginapanPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/galeri" element={<GaleriPage />} />
            <Route path="/kontak" element={<KontakPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="wisata" element={<AdminWisata />} />
            <Route path="galeri" element={<AdminGaleri />} />
            <Route path="perangkat" element={<AdminPerangkat />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
