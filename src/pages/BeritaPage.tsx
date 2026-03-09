import { beritaData } from '@/data/dummy';
import WaveDivider from '@/components/WaveDivider';
import { Calendar } from 'lucide-react';

const BeritaPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Kegiatan & Berita</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Kabar terbaru dari Desa Wisata Semayang</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {beritaData.filter(b => b.status === 'Publish').map(b => (
          <div key={b.id} className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all">
            <img src={b.thumbnail} alt={b.judul} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                <Calendar size={14} />
                {new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{b.judul}</h3>
              <p className="text-muted-foreground text-sm">{b.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default BeritaPage;
