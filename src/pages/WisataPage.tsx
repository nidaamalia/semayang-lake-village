import { wisataData } from '@/data/dummy';
import WaveDivider from '@/components/WaveDivider';

const WisataPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Destinasi Wisata</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Keindahan alam dan budaya yang menunggu untuk dijelajahi</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wisataData.map(w => (
          <div key={w.id} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-border">
            <img src={w.foto} alt={w.nama} className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground mb-3">{w.kategori}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{w.nama}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{w.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default WisataPage;
