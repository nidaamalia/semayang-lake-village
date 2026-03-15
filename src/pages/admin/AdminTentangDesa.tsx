import React, { useState, useEffect } from 'react';
import { usePengaturan, useMutatePengaturan } from '@/hooks/useData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImagePlus, Save, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT: Record<string, string> = {
  tentang_judul: 'Tentang Desa Semayang',
  tentang_sejarah: 'Desa Semayang terletak di tepian Danau Semayang, salah satu danau terbesar di Kalimantan Timur. Desa ini berada di Kecamatan Kenohan, Kabupaten Kutai Kartanegara, dan hanya bisa dijangkau melalui jalur sungai dari Sungai Mahakam.',
  tentang_visi: 'Menjadikan Desa Semayang sebagai desa wisata alam yang lestari, berdaya saing, dan mensejahterakan masyarakat.',
  tentang_misi: 'Mengembangkan potensi wisata berbasis kearifan lokal, menjaga kelestarian ekosistem danau, dan meningkatkan kapasitas masyarakat.',
  tentang_image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600',
  lokasi_luas: '45 km²',
  lokasi_kecamatan: 'Kenohan, Kutai Kartanegara',
  lokasi_akses: 'Jalur Sungai Mahakam',
};

export default function AdminTentangDesa() {
  const { data: list, isLoading } = usePengaturan();
  const mutate = useMutatePengaturan();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(DEFAULT);

  useEffect(() => {
    if (list && list.length > 0) {
      setForm({ ...DEFAULT, ...(list[0] as any) });
    }
  }, [list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file, 'foto');
      setForm(prev => ({ ...prev, tentang_image: url }));
      toast.success('Gambar berhasil diunggah');
    } catch {
      toast.error('Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await mutate.mutateAsync({ id: (list?.[0] as any)?.id ?? 1, ...form });
      toast.success('Halaman Tentang Desa disimpan!');
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
          <h2 className="text-3xl font-display font-bold text-foreground">Pengaturan Tentang Desa</h2>
          <p className="text-muted-foreground mt-1">Kelola profil, sejarah, visi misi, dan info lokasi desa.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving || isUploading} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</> : <><Save className="mr-2 h-4 w-4" /> Simpan</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profil & Sejarah */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil & Sejarah Desa</CardTitle>
            <CardDescription>Deskripsi utama yang tampil di halaman Tentang Desa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tentang_judul">Judul Halaman</Label>
              <Input id="tentang_judul" name="tentang_judul" value={form.tentang_judul} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="space-y-2">
                <Label htmlFor="tentang_sejarah">Deskripsi / Sejarah</Label>
                <Textarea id="tentang_sejarah" name="tentang_sejarah" rows={8} value={form.tentang_sejarah} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Gambar Profil</Label>
                {form.tentang_image && (
                  <div className="mb-2 w-full h-48 rounded-xl overflow-hidden border">
                    <img src={form.tentang_image} alt="Tentang" className="w-full h-full object-cover" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="tentang-img-upload" />
                <label
                  htmlFor="tentang-img-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-input bg-background hover:bg-muted rounded-md cursor-pointer text-sm font-medium transition-colors"
                >
                  <ImagePlus className="w-4 h-4" />
                  {isUploading ? 'Mengunggah...' : 'Ganti Gambar'}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visi Misi */}
        <Card>
          <CardHeader>
            <CardTitle>Visi</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea id="tentang_visi" name="tentang_visi" rows={4} value={form.tentang_visi} onChange={handleChange} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Misi</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea id="tentang_misi" name="tentang_misi" rows={4} value={form.tentang_misi} onChange={handleChange} />
          </CardContent>
        </Card>

        {/* Fakta Lokasi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fakta & Lokasi</CardTitle>
            <CardDescription>Data ringkas yang ditampilkan sebagai kartu info.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lokasi_luas">Luas Wilayah</Label>
              <Input id="lokasi_luas" name="lokasi_luas" value={form.lokasi_luas} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi_kecamatan">Kecamatan / Kabupaten</Label>
              <Input id="lokasi_kecamatan" name="lokasi_kecamatan" value={form.lokasi_kecamatan} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi_akses">Cara Akses</Label>
              <Input id="lokasi_akses" name="lokasi_akses" value={form.lokasi_akses} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
