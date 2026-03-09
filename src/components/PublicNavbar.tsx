import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang Desa' },
  { to: '/wisata', label: 'Wisata' },
  { to: '/kuliner', label: 'Kuliner' },
  { to: '/penginapan', label: 'Penginapan' },
  { to: '/berita', label: 'Berita' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/kontak', label: 'Kontak' },
];

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-primary/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold text-white tracking-wide">
          Desa Semayang
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? solid
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-sm border-t border-white/10 pb-4">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === l.to
                  ? 'bg-accent text-accent-foreground'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
