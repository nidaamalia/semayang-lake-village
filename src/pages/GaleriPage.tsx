import { useGaleri } from '@/hooks/useData';
import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';

const GaleriPage = () => {
  const { data: galeriData = [] } = useGaleri();
  return (
    <>
    <PageHero
      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600"
      title="Galeri Foto"
      subtitle="Keindahan Semayang dalam bingkai"
    />

    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {galeriData.map((g, i) => (
          <FadeInSection key={g.id}>
            <div className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md">
              <img
                src={g.url}
                alt={g.caption}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-56' : 'h-64'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white text-sm font-medium">{g.caption}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
  );
};

export default GaleriPage;
