import PageHero from '@/components/PageHero';
import FadeInSection from '@/components/FadeInSection';
import { MapPin, Navigation, Maximize, Building } from 'lucide-react';

const fakta = [
  { icon: MapPin, label: 'Lokasi', value: 'Tepian Danau Semayang' },
  { icon: Building, label: 'Kecamatan', value: 'Kenohan, Kukar' },
  { icon: Navigation, label: 'Akses', value: 'Jalur Sungai Mahakam' },
  { icon: Maximize, label: 'Luas Wilayah', value: '45 km²' },
];

const TentangDesa = () => (
  <>
    <PageHero
      image="https://images.unsplash.com/photo-1585409677983-0f6c41ca9b3b?w=1600"
      title="Tentang Desa Semayang"
      subtitle="Kisah sebuah desa di tepian danau, di mana kehidupan mengalir bersama air"
    />

    {/* Intro */}
    <section className="py-24 px-4">
      <FadeInSection>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600"
            alt="Danau Semayang"
            className="rounded-2xl shadow-xl w-full h-72 md:h-80 object-cover"
          />
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-2 block">Sejarah</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Desa di Atas Air</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              Desa Semayang terletak di tepian Danau Semayang, salah satu danau terbesar di Kalimantan Timur.
              Desa ini berada di Kecamatan Kenohan, Kabupaten Kutai Kartanegara, dan hanya bisa dijangkau
              melalui jalur sungai dari Sungai Mahakam. Kehidupan di sini berputar di sekitar air — rumah-rumah
              terapung, perahu sebagai kendaraan utama, dan danau sebagai sumber penghidupan.
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>

    {/* Pull Quote */}
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920')" }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p
          className="font-display text-2xl md:text-4xl italic text-white leading-relaxed"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
        >
          "Hanya bisa dijangkau lewat sungai.<br />
          Dan justru itulah yang membuatnya istimewa."
        </p>
      </div>
    </section>

    {/* Budaya Nelayan */}
    <section className="py-24 px-4 bg-card">
      <FadeInSection>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
              alt="Kehidupan nelayan"
              className="rounded-2xl shadow-xl w-full h-72 md:h-80 object-cover"
            />
          </div>
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-[0.2em] mb-2 block">Kehidupan</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Budaya Nelayan</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              Mayoritas penduduk Desa Semayang berprofesi sebagai nelayan. Mereka menangkap ikan menggunakan
              teknik tradisional yang diwariskan secara turun-temurun. Pagi hari, perahu-perahu kecil berjajar
              meninggalkan dermaga, dan sore hari kembali dengan hasil tangkapan segar. Kehidupan nelayan di
              sini bukan sekadar pekerjaan — ini adalah identitas dan warisan budaya.
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>

    {/* Fakta Singkat Strip */}
    <section className="relative py-14 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {fakta.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-2">
            <f.icon className="text-accent" size={32} />
            <span className="font-display text-xl font-bold text-primary-foreground">{f.value}</span>
            <span className="text-primary-foreground/70 text-sm">{f.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Data Desa */}
    <section className="py-24 px-4">
      <FadeInSection>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-10 shadow-lg border border-border">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">Data Desa</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Penduduk', value: '~1.200 Jiwa' },
                { label: 'Luas Wilayah', value: '45 km²' },
                { label: 'Kecamatan', value: 'Kenohan' },
                { label: 'Kabupaten', value: 'Kutai Kartanegara' },
              ].map(d => (
                <div key={d.label}>
                  <p className="text-2xl font-bold text-accent">{d.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  </>
);

export default TentangDesa;
