import { Link } from 'react-router-dom';
import { Anchor, Fish, Camera, Bed, Newspaper, MapPin, ChevronDown } from 'lucide-react';
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
    {/* Hero — full viewport, parallax */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920')" }}
      />
      {/* Gradient overlay: lighter top, darker bottom */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)' }} />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <p className="text-white/70 text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-body">
          Desa Wisata · Kutai Kartanegara · Kalimantan Timur
        </p>
        <h1
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)' }}
        >
          Di Mana Langit dan Danau Berbagi Warna yang Sama
        </h1>
        <p
          className="text-white/80 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
        >
          Desa Wisata Semayang — permata tersembunyi di tepian Danau Semayang, Kalimantan Timur
        </p>
        <Link
          to="/wisata"
          className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
        >
          Jelajahi Semayang
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/60 text-xs uppercase tracking-widest font-body">Gulir</span>
        <ChevronDown className="text-white/60" size={24} />
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
    <section className="py-16 px-4 bg-card relative">
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
