import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Anchor, Image, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
  { to: '/admin/wisata', label: 'Kelola Wisata', icon: Anchor },
  { to: '/admin/galeri', label: 'Kelola Galeri', icon: Image },
  { to: '/admin/perangkat', label: 'Kelola Perangkat Desa', icon: Users },
  { to: '#', label: 'Pengaturan', icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 lg:static lg:flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-primary-foreground/10">
          <h2 className="font-display text-lg font-bold">Desa Semayang</h2>
          <p className="text-primary-foreground/60 text-xs">Panel Administrasi</p>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {navItems.map(item => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-foreground/10">
          <button
            onClick={() => { navigate('/admin/login'); setSidebarOpen(false); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground w-full transition-colors"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-foreground p-1">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:block">Admin Semayang</span>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
