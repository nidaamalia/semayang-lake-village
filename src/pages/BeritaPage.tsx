import { beritaData } from '@/data/dummy';
import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';
import { Calendar } from 'lucide-react';

const BeritaPage = () => (
  <>
    <PageHero
      image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600"
      title="Kegiatan & Berita"
      subtitle="Kabar terbaru dari Desa Wisata Semayang"
    />

    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {beritaData.filter(b => b.status === 'Publish').map(b => (
          <FadeInSection key={b.id}>
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md border border-border hover:shadow-2xl transition-all">
              <div className="overflow-hidden h-52">
                <img src={b.thumbnail} alt={b.judul} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar size={14} />
                  {new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{b.judul}</h3>
                <p className="text-muted-foreground text-sm">{b.excerpt}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
);

export default BeritaPage;
