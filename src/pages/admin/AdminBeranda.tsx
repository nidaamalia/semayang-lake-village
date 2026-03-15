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
  hero_title: 'Di Mana Langit dan Danau Berbagi Warna yang Sama',
  hero_subtitle: 'Permata tersembunyi di tepian Danau Semayang, Kalimantan Timur',
  hero_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
};

export default function AdminBeranda() {
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
      setForm(prev => ({ ...prev, hero_image: url }));
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
      toast.success('Pengaturan Beranda disimpan!');
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
          <h2 className="text-3xl font-display font-bold text-foreground">Pengaturan Beranda</h2>
          <p className="text-muted-foreground mt-1">Atur judul, sub-judul, dan gambar latar halaman utama.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving || isUploading} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</> : <><Save className="mr-2 h-4 w-4" /> Simpan</>}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Konten Hero (Tampilan Utama)</CardTitle>
          <CardDescription>Bagian paling atas yang dilihat pengunjung pertama kali.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Judul Utama</Label>
            <Input id="hero_title" name="hero_title" value={form.hero_title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Sub-Judul</Label>
            <Textarea id="hero_subtitle" name="hero_subtitle" rows={3} value={form.hero_subtitle} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Gambar Latar Belakang</Label>
            {form.hero_image && (
              <div className="mb-2 w-full h-52 rounded-xl overflow-hidden border">
                <img src={form.hero_image} alt="Hero" className="w-full h-full object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="hero-img-upload" />
            <label
              htmlFor="hero-img-upload"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-input bg-background hover:bg-muted rounded-md cursor-pointer text-sm font-medium transition-colors"
            >
              <ImagePlus className="w-4 h-4" />
              {isUploading ? 'Mengunggah...' : 'Ganti Gambar Latar'}
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
