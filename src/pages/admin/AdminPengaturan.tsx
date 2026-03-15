import React, { useState, useEffect } from 'react';
import { usePengaturan, useMutatePengaturan } from '@/hooks/useData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImagePlus, Save, Loader2, Link as LinkIcon, MapPin, Phone, Mail } from 'lucide-react';
import { uploadImage } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT_STATE = {
  id: 1,
  hero_title: 'Di Mana Langit dan Danau Berbagi Warna yang Sama',
  hero_subtitle: 'Permata tersembunyi di tepian Danau Semayang, Kalimantan Timur',
  hero_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  tentang_judul: 'Desa Wisata Semayang',
  tentang_deskripsi: 'Desa Semayang merupakan salah satu desa yang terletak di tepian Danau Semayang, Kecamatan Kenohan, Kabupaten Kutai Kartanegara, Kalimantan Timur.',
  tentang_image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
  kontak_alamat: 'Desa Semayang, Kec. Kenohan, Kab. Kutai Kartanegara, Kalimantan Timur',
  kontak_email: 'info@semayang.desa.id',
  kontak_telepon: '+62 812 3456 7890',
  kontak_whatsapp: '6281234567890',
  kontak_instagram: 'desasemayang',
  kontak_facebook: 'Desa Wisata Semayang',
  kontak_map_url: '',
};

export default function AdminPengaturan() {
  const { data: pengaturanList, isLoading } = usePengaturan();
  const mutatePengaturan = useMutatePengaturan();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [formData, setFormData] = useState<typeof DEFAULT_STATE>(DEFAULT_STATE);

  useEffect(() => {
    if (pengaturanList && pengaturanList.length > 0) {
      setFormData({ ...DEFAULT_STATE, ...(pengaturanList[0] as any) });
    }
  }, [pengaturanList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(field);
      const url = await uploadImage(file, 'foto');
      setFormData(prev => ({ ...prev, [field]: url }));
      toast.success('Gambar berhasil diunggah');
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengunggah gambar');
    } finally {
      setIsUploading(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await mutatePengaturan.mutateAsync(formData);
      toast.success('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan pengaturan');
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
          <h2 className="text-3xl font-display font-bold text-foreground">Pengaturan Web</h2>
          <p className="text-muted-foreground mt-1">Kelola konten statis halaman Beranda, Tentang Desa, dan Kontak.</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving || !!isUploading}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isSaving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Simpan Perubahan</>
          )}
        </Button>
      </div>

      <Tabs defaultValue="beranda" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="beranda">Beranda</TabsTrigger>
          <TabsTrigger value="tentang">Tentang Desa</TabsTrigger>
          <TabsTrigger value="kontak">Kontak</TabsTrigger>
        </TabsList>

        {/* ── TAB BERANDA ── */}
        <TabsContent value="beranda">
          <Card>
            <CardHeader>
              <CardTitle>Konten Beranda (Hero Section)</CardTitle>
              <CardDescription>Atur judul utama, sub-judul, dan gambar latar belakang beranda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Judul Utama</Label>
                <Input
                  id="hero_title"
                  name="hero_title"
                  value={formData.hero_title}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Sub-Judul</Label>
                <Textarea
                  id="hero_subtitle"
                  name="hero_subtitle"
                  value={formData.hero_subtitle}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Gambar Latar Belakang</Label>
                {formData.hero_image && (
                  <div className="mb-2 relative w-full h-52 rounded-xl overflow-hidden border">
                    <img src={formData.hero_image} alt="Hero bg" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hero_image')}
                  className="hidden"
                  id="hero-image-upload"
                />
                <label
                  htmlFor="hero-image-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-input bg-background hover:bg-muted rounded-md cursor-pointer text-sm font-medium transition-colors"
                >
                  <ImagePlus className="w-4 h-4" />
                  {isUploading === 'hero_image' ? 'Mengunggah...' : 'Ganti Gambar Latar'}
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB TENTANG ── */}
        <TabsContent value="tentang">
          <Card>
            <CardHeader>
              <CardTitle>Profil Desa (Halaman Tentang)</CardTitle>
              <CardDescription>Kelola judul, deskripsi, dan gambar untuk halaman Tentang Desa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="tentang_judul">Judul Profil</Label>
                <Input
                  id="tentang_judul"
                  name="tentang_judul"
                  value={formData.tentang_judul}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tentang_deskripsi">Deskripsi Desa</Label>
                <Textarea
                  id="tentang_deskripsi"
                  name="tentang_deskripsi"
                  rows={8}
                  value={formData.tentang_deskripsi}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Gambar Profil Desa</Label>
                {formData.tentang_image && (
                  <div className="mb-2 relative w-full md:w-1/2 h-48 rounded-xl overflow-hidden border">
                    <img src={formData.tentang_image} alt="Tentang" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'tentang_image')}
                  className="hidden"
                  id="tentang-image-upload"
                />
                <label
                  htmlFor="tentang-image-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-input bg-background hover:bg-muted rounded-md cursor-pointer text-sm font-medium transition-colors w-full md:w-1/2"
                >
                  <ImagePlus className="w-4 h-4" />
                  {isUploading === 'tentang_image' ? 'Mengunggah...' : 'Ganti Gambar Profil'}
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB KONTAK ── */}
        <TabsContent value="kontak">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak & Media Sosial</CardTitle>
              <CardDescription>Nomor telepon, email, dan sosial media yang tampil di halaman Kontak.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kontak_telepon" className="flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Telepon
                  </Label>
                  <Input
                    id="kontak_telepon"
                    name="kontak_telepon"
                    value={formData.kontak_telepon}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak_whatsapp" className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-green-500" /> WhatsApp
                    <span className="text-muted-foreground text-xs">(angka saja, cth: 62812...)</span>
                  </Label>
                  <Input
                    id="kontak_whatsapp"
                    name="kontak_whatsapp"
                    value={formData.kontak_whatsapp}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak_email" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Email
                  </Label>
                  <Input
                    id="kontak_email"
                    name="kontak_email"
                    value={formData.kontak_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak_instagram">Instagram Username</Label>
                  <Input
                    id="kontak_instagram"
                    name="kontak_instagram"
                    placeholder="contoh: desasemayang (tanpa @)"
                    value={formData.kontak_instagram}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak_facebook">Facebook Name / URL</Label>
                  <Input
                    id="kontak_facebook"
                    name="kontak_facebook"
                    value={formData.kontak_facebook}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kontak_alamat" className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Alamat Lengkap
                </Label>
                <Textarea
                  id="kontak_alamat"
                  name="kontak_alamat"
                  value={formData.kontak_alamat}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kontak_map_url" className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" /> Google Maps Embed URL
                  <span className="text-muted-foreground text-xs">(salin nilai src iframe dari Google Maps)</span>
                </Label>
                <Input
                  id="kontak_map_url"
                  name="kontak_map_url"
                  value={formData.kontak_map_url}
                  onChange={handleChange}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
