import { penginapanData } from '@/data/dummy';
import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';
import { Bed } from 'lucide-react';

const PenginapanPage = () => (
  <>
    <PageHero
      image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600"
      title="Penginapan"
      subtitle="Bermalam di tepi danau, bangun dengan suara air dan kicau burung"
    />

    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {penginapanData.map(p => (
          <FadeInSection key={p.id}>
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md border border-border hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="overflow-hidden h-52">
                <img src={p.foto} alt={p.nama} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{p.nama}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.deskripsi}</p>
                <p className="text-accent font-bold text-lg mb-4">{p.harga}</p>
                <div className="flex flex-wrap gap-2">
                  {p.fasilitas.map(f => (
                    <span key={f} className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                      <Bed size={12} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
);

export default PenginapanPage;
