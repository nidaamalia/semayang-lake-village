import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import AdminKuliner from "./pages/admin/AdminKuliner";
import AdminPenginapan from "./pages/admin/AdminPenginapan";
import AdminGaleri from "./pages/admin/AdminGaleri";
import AdminBeranda from "./pages/admin/AdminBeranda";
import AdminTentangDesa from "./pages/admin/AdminTentangDesa";
import AdminKontak from "./pages/admin/AdminKontak";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
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
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="berita" element={<AdminBerita />} />
              <Route path="wisata" element={<AdminWisata />} />
              <Route path="kuliner" element={<AdminKuliner />} />
              <Route path="penginapan" element={<AdminPenginapan />} />
              <Route path="galeri" element={<AdminGaleri />} />
              <Route path="beranda" element={<AdminBeranda />} />
              <Route path="tentang" element={<AdminTentangDesa />} />
              <Route path="kontak" element={<AdminKontak />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
