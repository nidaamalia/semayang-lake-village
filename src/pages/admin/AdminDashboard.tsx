import { Newspaper, Anchor, Image, Utensils, Home } from 'lucide-react';
import { useBerita, useWisata, useGaleri, useKuliner, usePenginapan } from '../../hooks/useData';

const AdminDashboard = () => {
  const { data: berita, isLoading: loadingBerita } = useBerita();
  const { data: wisata, isLoading: loadingWisata } = useWisata();
  const { data: galeri, isLoading: loadingGaleri } = useGaleri();
  const { data: kuliner, isLoading: loadingKuliner } = useKuliner();
  const { data: penginapan, isLoading: loadingPenginapan } = usePenginapan();

  const isLoading = loadingBerita || loadingWisata || loadingGaleri || loadingKuliner || loadingPenginapan;

  const stats = [
    { label: 'Total Berita', value: berita?.length || 0, icon: Newspaper, color: 'text-accent' },
    { label: 'Total Wisata', value: wisata?.length || 0, icon: Anchor, color: 'text-secondary' },
    { label: 'Total Kuliner', value: kuliner?.length || 0, icon: Utensils, color: 'text-primary' },
    { label: 'Total Penginapan', value: penginapan?.length || 0, icon: Home, color: 'text-accent' },
    { label: 'Total Foto Galeri', value: galeri?.length || 0, icon: Image, color: 'text-secondary' },
  ];

  const allActivities = [
    ...(berita || []).map((b: any) => ({ text: `Berita "${b.judul}" dipublikasikan`, time: b.created_at || b.tanggal || new Date().toISOString() })),
    ...(wisata || []).map((w: any) => ({ text: `Data wisata "${w.nama}" ditambahkan`, time: w.created_at || new Date().toISOString() })),
    ...(kuliner || []).map((k: any) => ({ text: `Data kuliner "${k.nama}" ditambahkan`, time: k.created_at || new Date().toISOString() })),
    ...(penginapan || []).map((p: any) => ({ text: `Data penginapan "${p.nama}" ditambahkan`, time: p.created_at || new Date().toISOString() })),
    ...(galeri || []).map((g: any) => ({ text: `Foto baru ditambahkan ke galeri`, time: g.created_at || new Date().toISOString() })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)
    .map(a => {
      const date = new Date(a.time);
      return {
        ...a,
        timeFormatted: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
    });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            {allActivities.length > 0 ? (
              <div className="space-y-3">
                {allActivities.map((a, i) => (
                  <div key={i} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.timeFormatted}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada aktivitas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
