import React, { useState, useEffect } from 'react';
import { usePengaturan, useMutatePengaturan } from '@/hooks/useData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2, Phone, Mail, MapPin, Link as LinkIcon, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT: Record<string, string> = {
  kontak_alamat: 'Desa Semayang RT 01, Kec. Kenohan, Kutai Kartanegara, Kalimantan Timur',
  kontak_email: 'pokdarwis.dikmalestari@gmail.com',
  kontak_telepon: '+62 812 3456 7890',
  kontak_whatsapp: '6281234567890',
  kontak_jam: 'Setiap hari, 08:00 - 17:00 WITA',
  kontak_instagram: 'desasemayang',
  kontak_facebook: 'Desa Wisata Semayang',
  kontak_map_url: '',
};

export default function AdminKontak() {
  const { data: list, isLoading } = usePengaturan();
  const mutate = useMutatePengaturan();
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(DEFAULT);

  useEffect(() => {
    if (list && list.length > 0) {
      setForm({ ...DEFAULT, ...(list[0] as any) });
    }
  }, [list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await mutate.mutateAsync({ id: (list?.[0] as any)?.id ?? 1, ...form });
      toast.success('Informasi Kontak disimpan!');
    } catch {
      toast.error('Gagal menyimpan');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Pengaturan Kontak</h2>
          <p className="text-muted-foreground mt-1">Kelola informasi kontak dan media sosial yang tampil di website.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</> : <><Save className="mr-2 h-4 w-4" /> Simpan</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info Kontak */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Kontak</CardTitle>
            <CardDescription>Nomor telepon, email, dan jam operasional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kontak_telepon" className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> Telepon
              </Label>
              <Input id="kontak_telepon" name="kontak_telepon" value={form.kontak_telepon} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kontak_whatsapp" className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-green-500" /> WhatsApp
                <span className="text-muted-foreground text-xs">(angka saja, cth: 62812...)</span>
              </Label>
              <Input id="kontak_whatsapp" name="kontak_whatsapp" value={form.kontak_whatsapp} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kontak_email" className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input id="kontak_email" name="kontak_email" value={form.kontak_email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kontak_jam">Jam Operasional</Label>
              <Input id="kontak_jam" name="kontak_jam" value={form.kontak_jam} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Media Sosial */}
        <Card>
          <CardHeader>
            <CardTitle>Media Sosial</CardTitle>
            <CardDescription>Akun media sosial yang dapat dikunjungi pengunjung.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kontak_instagram" className="flex items-center gap-1">
                <Instagram className="w-4 h-4 text-pink-500" /> Instagram
                <span className="text-muted-foreground text-xs">(tanpa @)</span>
              </Label>
              <Input
                id="kontak_instagram"
                name="kontak_instagram"
                placeholder="contoh: desasemayang"
                value={form.kontak_instagram}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kontak_facebook" className="flex items-center gap-1">
                <Facebook className="w-4 h-4 text-blue-500" /> Facebook
              </Label>
              <Input
                id="kontak_facebook"
                name="kontak_facebook"
                placeholder="Nama halaman atau URL"
                value={form.kontak_facebook}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alamat */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Alamat & Peta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kontak_alamat" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Alamat Lengkap
              </Label>
              <Textarea id="kontak_alamat" name="kontak_alamat" rows={3} value={form.kontak_alamat} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kontak_map_url" className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" /> Google Maps Embed URL
                <span className="text-muted-foreground text-xs">(salin nilai <code>src</code> dari iframe embed Google Maps)</span>
              </Label>
              <Input
                id="kontak_map_url"
                name="kontak_map_url"
                placeholder="https://www.google.com/maps/embed?pb=..."
                value={form.kontak_map_url}
                onChange={handleChange}
              />
              {form.kontak_map_url && (
                <div className="mt-2 rounded-xl overflow-hidden h-48 border">
                  <iframe
                    src={form.kontak_map_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Preview Peta"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
