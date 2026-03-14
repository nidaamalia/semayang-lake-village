import { useWisata } from '@/hooks/useData';
import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';

const WisataPage = () => {
  const { data: wisataData = [] } = useWisata();
  return (
    <>
    <PageHero
      image="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600"
      title="Destinasi Wisata"
      subtitle="Keindahan alam dan budaya yang menunggu untuk dijelajahi"
    />

    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wisataData.map(w => (
          <FadeInSection key={w.id}>
            <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 bg-card border border-border">
              <div className="overflow-hidden h-52">
                <img src={w.foto} alt={w.nama} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mb-3">{w.kategori}</span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{w.nama}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.deskripsi}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
  );
};

export default WisataPage;
