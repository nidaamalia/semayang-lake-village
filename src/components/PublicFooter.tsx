import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const PublicFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-display text-xl font-bold mb-3">Desa Wisata Semayang</h3>
        <p className="text-primary-foreground/70 text-sm leading-relaxed">
          Permata tersembunyi di tepian Danau Semayang, Kutai Kartanegara, Kalimantan Timur.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold mb-3">Tautan</h4>
        <div className="space-y-2 text-sm">
          {[
            { to: '/tentang', label: 'Tentang Desa' },
            { to: '/wisata', label: 'Wisata' },
            { to: '/kuliner', label: 'Kuliner Khas' },
            { to: '/galeri', label: 'Galeri' },
          ].map(l => (
            <Link key={l.to} to={l.to} className="block text-primary-foreground/70 hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold mb-3">Kontak</h4>
        <div className="space-y-2 text-sm text-primary-foreground/70">
          <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Desa Semayang RT 01, Kec. Kenohan, Kutai Kartanegara</p>
          <p className="flex items-center gap-2"><Phone size={16} /> +62 812 3456 7890</p>
          <p className="flex items-center gap-2"><Mail size={16} /> pokdarwis.dikmalestari@gmail.com</p>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 text-center py-4 text-xs text-primary-foreground/50">
      © 2026 Pokdarwis Dikmalestari — Desa Wisata Semayang
    </div>
  </footer>
);

export default PublicFooter;
