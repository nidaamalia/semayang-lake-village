import { Link } from 'react-router-dom';
import { Anchor, Fish, Camera, Bed, Newspaper, MapPin } from 'lucide-react';
import WaveDivider from '@/components/WaveDivider';

const teasers = [
  { icon: Anchor, title: 'Wisata Alam', desc: 'Jelajahi danau, sungai, dan keindahan alam Borneo yang masih perawan.', to: '/wisata' },
  { icon: Fish, title: 'Kuliner Khas', desc: 'Cicipi ikan segar langsung dari danau, dimasak dengan resep turun-temurun.', to: '/kuliner' },
  { icon: Camera, title: 'Galeri Foto', desc: 'Lihat keindahan Semayang melalui lensa — danau, desa, dan kehidupan nelayan.', to: '/galeri' },
  { icon: Bed, title: 'Penginapan', desc: 'Bermalam di tepi danau atau di rumah terapung tradisional.', to: '/penginapan' },
  { icon: Newspaper, title: 'Berita Terbaru', desc: 'Kabar terkini dari desa dan kegiatan wisata.', to: '/berita' },
  { icon: MapPin, title: 'Lokasi & Kontak', desc: 'Temukan kami di tepian Danau Semayang, Kutai Kartanegara.', to: '/kontak' },
];

const Index = () => (
  <>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500375592497-5e01611a4a47?w=1600')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-lg">
          Di Mana Langit dan Danau Berbagi Warna yang Sama
        </h1>
        <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 font-light">
          Desa Wisata Semayang — permata tersembunyi di tepian Danau Semayang, Kalimantan Timur
        </p>
        <Link
          to="/wisata"
          className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Jelajahi Semayang
        </Link>
      </div>
    </section>

    <WaveDivider color="hsl(var(--background))" />

    {/* Intro */}
    <section className="py-16 px-4 max-w-4xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
        Selamat Datang di Semayang
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        Tersembunyi di sepanjang aliran Sungai Mahakam, Desa Semayang adalah sebuah dunia yang bergerak
        dengan irama air. Di sini, rumah-rumah mengapung bersama arus, nelayan berangkat saat fajar menyingsing,
        dan langit sore menyala dalam warna emas dan jingga di atas danau yang tenang.
      </p>
    </section>

    {/* Teasers */}
    <section className="py-16 px-4 bg-card">
      <WaveDivider color="hsl(var(--card))" flip className="absolute -top-[59px]" />
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">Jelajahi Semayang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teasers.map(t => (
            <Link
              key={t.to}
              to={t.to}
              className="group bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
            >
              <t.icon className="text-accent mb-4" size={32} />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{t.title}</h3>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <WaveDivider color="hsl(var(--background))" />

    {/* Quote */}
    <section className="py-20 px-4 text-center">
      <blockquote className="max-w-2xl mx-auto">
        <p className="font-display text-2xl md:text-3xl italic text-foreground/80 leading-relaxed">
          "Semayang bukan tujuan wisata. Semayang adalah sebuah perasaan — ketika waktu melambat dan hati menemukan tempatnya."
        </p>
      </blockquote>
    </section>
  </>
);

export default Index;
