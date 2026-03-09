import { penginapanData } from '@/data/dummy';
import WaveDivider from '@/components/WaveDivider';
import { Bed } from 'lucide-react';

const PenginapanPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Penginapan</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Bermalam di tepi danau, bangun dengan suara air dan kicau burung</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {penginapanData.map(p => (
          <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all">
            <img src={p.foto} alt={p.nama} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{p.nama}</h3>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{p.deskripsi}</p>
              <p className="text-accent font-bold text-lg mb-3">{p.harga}</p>
              <div className="flex flex-wrap gap-2">
                {p.fasilitas.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    <Bed size={12} /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default PenginapanPage;
