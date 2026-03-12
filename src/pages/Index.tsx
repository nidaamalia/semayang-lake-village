import { Link } from 'react-router-dom';
import { ChevronDown, Palmtree, Fish, Home, CalendarDays } from 'lucide-react';
import WaveDivider from '@/components/WaveDivider';

const categories = [
  {
    title: 'Wisata Alam',
    desc: 'Jelajahi danau, sungai, dan keindahan alam Borneo yang masih perawan.',
    to: '/wisata',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600',
  },
  {
    title: 'Kuliner Khas',
    desc: 'Cicipi ikan segar langsung dari danau, dimasak dengan resep turun-temurun.',
    to: '/kuliner',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
  },
  {
    title: 'Galeri Foto',
    desc: 'Keindahan Semayang melalui lensa — danau, desa, dan kehidupan nelayan.',
    to: '/galeri',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600',
  },
  {
    title: 'Penginapan',
    desc: 'Bermalam di tepi danau atau di rumah terapung tradisional.',
    to: '/penginapan',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
  },
  {
    title: 'Berita Terbaru',
    desc: 'Kabar terkini dari desa dan kegiatan wisata.',
    to: '/berita',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600',
  },
  {
    title: 'Lokasi & Kontak',
    desc: 'Temukan kami di tepian Danau Semayang, Kutai Kartanegara.',
    to: '/kontak',
    img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600',
  },
];

const destinasi = [
  {
    title: 'Sunset Danau Semayang',
    desc: 'Saksikan langit sore menyala dalam gradasi emas dan jingga di atas permukaan danau yang tenang. Momen magis yang hanya bisa ditemukan di tepian Danau Semayang.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    to: '/wisata',
  },
  {
    title: 'Susur Sungai Mahakam',
    desc: 'Ikuti aliran sungai terpanjang di Kalimantan Timur dengan perahu tradisional. Nikmati panorama hutan tropis dan kehidupan tepian sungai yang otentik.',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    to: '/wisata',
  },
  {
    title: 'Menyaksikan Pesut Mahakam',
    desc: 'Temui lumba-lumba air tawar langka yang hanya ada di Sungai Mahakam. Pengalaman sekali seumur hidup yang tak akan terlupakan.',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200',
    to: '/wisata',
  },
];

const stats = [
  { icon: Palmtree, value: '3', label: 'Destinasi Unggulan' },
  { icon: Fish, value: '10+', label: 'Kuliner Khas' },
  { icon: Home, value: '5', label: 'Penginapan Tersedia' },
  { icon: CalendarDays, value: '365', label: 'Hari Buka / Tahun' },
];

const Index = () => (
  <>
    {/* ─── HERO ─── */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)',
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <p
          className="text-white/60 text-xs md:text-sm uppercase mb-5 font-body"
          style={{ letterSpacing: '0.35em', marginRight: '-0.35em' }}
        >
          Desa Wisata · Kutai Kartanegara · Kalimantan Timur
        </p>
        <h1
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
        >
          Di Mana Langit dan Danau
          <br />
          Berbagi Warna yang Sama
        </h1>
        <p
          className="text-white/75 text-base md:text-xl mb-10 font-light max-w-2xl mx-auto"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          Permata tersembunyi di tepian Danau Semayang, Kalimantan Timur
        </p>
        <Link
          to="/wisata"
          className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          Jelajahi Semayang
        </Link>
      </div>
    </section>

    {/* ─── WELCOME (has texture bg) ─── */}
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-3 block">
          Selamat Datang
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
          Dunia yang Bergerak dengan Irama Air
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Tersembunyi di sepanjang aliran Sungai Mahakam, Desa Semayang adalah sebuah dunia yang bergerak
          dengan irama air. Di sini, rumah-rumah mengapung bersama arus, nelayan berangkat saat fajar
          menyingsing, dan langit sore menyala dalam warna emas dan jingga di atas danau yang tenang.
        </p>
      </div>
    </section>

    {/* ─── PHOTO CATEGORY CARDS ─── */}
    <section className="py-20 px-4 bg-card relative">
      <WaveDivider color="hsl(var(--card))" flip className="absolute -top-[59px]" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-2 block">
            Eksplorasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Jelajahi Semayang
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative rounded-2xl overflow-hidden h-72 sm:h-80 block"
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="font-display text-xl font-bold text-white mb-1">{c.title}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <WaveDivider color="hsl(var(--background))" />

    {/* ─── DESTINASI UNGGULAN ─── */}
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-2 block">
            Sorotan
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Destinasi Unggulan
          </h2>
        </div>

        {destinasi.map((d, i) => {
          const reversed = i % 2 !== 0;
          return (
            <div
              key={d.title}
              className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center mb-20 last:mb-0`}
            >
              {/* image */}
              <div className="w-full lg:w-3/5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-64 sm:h-80 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* text */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-2">
                  Destinasi #{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                  {d.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">{d.desc}</p>
                <Link
                  to={d.to}
                  className="self-start bg-accent text-accent-foreground px-7 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* ─── STATISTIK STRIP ─── */}
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <s.icon className="text-accent" size={36} />
            <span className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {s.value}
            </span>
            <span className="text-primary-foreground/70 text-sm font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* ─── TESTIMONIAL / QUOTE ─── */}
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <svg className="mx-auto mb-6 text-accent" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7.05C9.14 8.16 8 10.15 8 12.5V18h6V12H9.53c.13-2.06 1.3-3.66 3.47-4.62L11 7.05zM20 7.05C18.14 8.16 17 10.15 17 12.5V18h6V12h-4.47c.13-2.06 1.3-3.66 3.47-4.62L20 7.05z" />
        </svg>
        <blockquote>
          <p
            className="font-display text-2xl md:text-4xl italic text-white leading-relaxed mb-8"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            Semayang adalah tempat di mana saya benar-benar bisa melepas penat dari kota.
            Waktu seolah melambat, dan yang tersisa hanya suara air dan hembusan angin.
          </p>
          <footer className="text-white/60 text-sm uppercase tracking-widest">
            — Pengunjung dari Jakarta
          </footer>
        </blockquote>
      </div>
    </section>

    <WaveDivider color="hsl(var(--background))" />

    {/* ─── CTA FINAL ─── */}
    <section className="py-24 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Siap Menjelajah?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Rencanakan perjalanan Anda ke Desa Wisata Semayang dan temukan ketenangan yang tak bisa ditemukan di tempat lain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/wisata"
            className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg"
          >
            Lihat Destinasi
          </Link>
          <Link
            to="/kontak"
            className="border-2 border-foreground/20 text-foreground px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-all"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Index;
