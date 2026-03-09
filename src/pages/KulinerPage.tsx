import { kulinerData } from '@/data/dummy';
import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';

const KulinerPage = () => (
  <>
    <PageHero
      image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600"
      title="Kuliner Khas"
      subtitle="Cita rasa ikan air tawar segar langsung dari Danau Semayang"
    />

    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="space-y-20">
        {kulinerData.map((k, i) => (
          <FadeInSection key={k.id}>
            <div className={`flex flex-col md:flex-row gap-10 items-center ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-96 shrink-0 overflow-hidden rounded-2xl shadow-xl">
                <img src={k.foto} alt={k.nama} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1">
                <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-2 block">Hidangan #{i + 1}</span>
                <h3 className="font-display text-3xl font-bold text-foreground mb-4">{k.nama}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">{k.deskripsi}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
);

export default KulinerPage;
