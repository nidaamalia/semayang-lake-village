import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Memuat panel admin...</p>
      </div>
    );
  }

  // Jika belum login, redirect ke halaman login admin
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika sudah tersimpan session, izinkan render anak route
  return <Outlet />;
};

export default ProtectedRoute;
