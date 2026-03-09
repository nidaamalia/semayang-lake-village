import { Newspaper, Anchor, Image, Users } from 'lucide-react';

const stats = [
  { label: 'Total Berita', value: 4, icon: Newspaper, color: 'text-accent' },
  { label: 'Total Wisata', value: 6, icon: Anchor, color: 'text-secondary' },
  { label: 'Total Foto Galeri', value: 9, icon: Image, color: 'text-primary' },
  { label: 'Total Perangkat', value: 5, icon: Users, color: 'text-accent' },
];

const activities = [
  { text: 'Berita "Festival Danau Semayang 2026" dipublikasikan', time: '2 jam lalu' },
  { text: 'Foto baru ditambahkan ke galeri', time: '5 jam lalu' },
  { text: 'Data wisata "Jembatan Gantung" diperbarui', time: '1 hari lalu' },
  { text: 'Perangkat desa baru ditambahkan', time: '2 hari lalu' },
  { text: 'Berita "Pembangunan Dermaga" dipublikasikan', time: '3 hari lalu' },
];

const AdminDashboard = () => (
  <div>
    <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(s => (
        <div key={s.label} className="bg-card rounded-xl p-5 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <s.icon size={24} className={s.color} />
            <span className="text-3xl font-bold text-foreground">{s.value}</span>
          </div>
          <p className="text-muted-foreground text-sm">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h2>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start justify-between py-2 border-b border-border last:border-0">
            <p className="text-sm text-foreground">{a.text}</p>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
