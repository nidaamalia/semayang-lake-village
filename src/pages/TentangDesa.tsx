import WaveDivider from '@/components/WaveDivider';

const TentangDesa = () => (
  <>
    {/* Hero */}
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Tentang Desa Semayang</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Kisah sebuah desa di tepian danau, di mana kehidupan mengalir bersama air</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-4xl mx-auto space-y-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600" alt="Danau Semayang" className="rounded-xl shadow-lg w-full h-64 object-cover" />
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Desa di Atas Air</h2>
          <p className="text-muted-foreground leading-relaxed">
            Desa Semayang terletak di tepian Danau Semayang, salah satu danau terbesar di Kalimantan Timur. Desa ini berada di Kecamatan Kenohan, Kabupaten Kutai Kartanegara, dan hanya bisa dijangkau melalui jalur sungai dari Sungai Mahakam. Kehidupan di sini berputar di sekitar air — rumah-rumah terapung, perahu sebagai kendaraan utama, dan danau sebagai sumber penghidupan.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="md:order-2">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600" alt="Kehidupan nelayan" className="rounded-xl shadow-lg w-full h-64 object-cover" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Budaya Nelayan</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mayoritas penduduk Desa Semayang berprofesi sebagai nelayan. Mereka menangkap ikan menggunakan teknik tradisional yang diwariskan secara turun-temurun. Pagi hari, perahu-perahu kecil berjajar meninggalkan dermaga, dan sore hari kembali dengan hasil tangkapan segar. Kehidupan nelayan di sini bukan sekadar pekerjaan — ini adalah identitas dan warisan budaya.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-8 shadow-md border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Data Desa</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
    </section>
  </>
);

export default TentangDesa;
