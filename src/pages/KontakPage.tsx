import WaveDivider from '@/components/WaveDivider';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const KontakPage = () => (
  <>
    <section className="relative py-32 px-4 bg-primary text-primary-foreground text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Kontak & Lokasi</h1>
      <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Temukan kami di tepian Danau Semayang</p>
    </section>
    <WaveDivider color="hsl(var(--background))" />

    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Informasi Kontak</h2>
          <div className="space-y-4">
            {[
              { icon: MapPin, label: 'Alamat', value: 'Desa Semayang RT 01, Kec. Kenohan, Kutai Kartanegara, Kalimantan Timur' },
              { icon: Phone, label: 'Telepon', value: '+62 812 3456 7890' },
              { icon: Mail, label: 'Email', value: 'pokdarwis.dikmalestari@gmail.com' },
              { icon: Clock, label: 'Jam Operasional', value: 'Setiap hari, 08:00 - 17:00 WITA' },
            ].map(c => (
              <div key={c.label} className="flex gap-4 items-start bg-card p-4 rounded-xl border border-border">
                <c.icon className="text-accent shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-foreground text-sm">{c.label}</p>
                  <p className="text-muted-foreground text-sm">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Pokdarwis Dikmalestari</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Kelompok Sadar Wisata Desa Semayang yang mengelola dan mengembangkan potensi wisata desa.
              Hubungi kami untuk informasi paket wisata, pemandu, dan reservasi penginapan.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Peta Lokasi</h2>
          <div className="bg-muted rounded-xl h-80 flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-3 text-accent" />
              <p className="font-medium">Google Maps</p>
              <p className="text-sm">Danau Semayang, Kutai Kartanegara</p>
              <p className="text-xs mt-2">(Embed peta akan ditampilkan di sini)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default KontakPage;
