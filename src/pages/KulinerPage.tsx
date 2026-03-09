import { kulinerData } from '@/data/dummy';
import WaveDivider from '@/components/WaveDivider';

const KulinerPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Kuliner Khas</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Cita rasa ikan air tawar segar langsung dari Danau Semayang</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="space-y-8">
        {kulinerData.map((k, i) => (
          <div key={k.id} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
            <img src={k.foto} alt={k.nama} className="w-full md:w-80 h-56 object-cover rounded-xl shadow-md" />
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{k.nama}</h3>
              <p className="text-muted-foreground leading-relaxed">{k.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default KulinerPage;
