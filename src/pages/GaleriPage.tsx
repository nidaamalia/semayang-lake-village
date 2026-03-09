import { galeriData } from '@/data/dummy';
import WaveDivider from '@/components/WaveDivider';

const GaleriPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Galeri Foto</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Keindahan Semayang dalam bingkai</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {galeriData.map((g, i) => (
          <div key={g.id} className="break-inside-avoid group relative overflow-hidden rounded-xl shadow-md">
            <img
              src={g.url}
              alt={g.caption}
              className={`w-full object-cover ${i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-56' : 'h-64'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-primary-foreground text-sm font-medium">{g.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default GaleriPage;
