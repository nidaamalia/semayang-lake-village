import { useState } from 'react';
import { type Penginapan } from '@/data/dummy';
import { usePenginapan, useMutatePenginapan, useDeletePenginapan } from '@/hooks/useData';
import { uploadImage, deleteImage } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Home } from 'lucide-react';

const AdminPenginapan = () => {
  const { data: items = [], isLoading } = usePenginapan();
  const mutatePenginapan = useMutatePenginapan();
  const deletePenginapan = useDeletePenginapan();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Penginapan | null>(null);
  const [form, setForm] = useState({ nama: '', deskripsi: '', harga: '', foto: '', fasilitas: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openNew = () => { 
    setEditing(null); 
    setForm({ nama: '', deskripsi: '', harga: '', foto: '', fasilitas: '' }); 
    setImageFile(null);
    setFormOpen(true); 
  };

  const openEdit = (p: Penginapan) => { 
    setEditing(p); 
    setForm({ nama: p.nama, deskripsi: p.deskripsi, harga: p.harga, foto: p.foto, fasilitas: p.fasilitas.join(', ') }); 
    setImageFile(null);
    setFormOpen(true); 
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let fotoUrl = form.foto;
      if (imageFile) {
        fotoUrl = await uploadImage(imageFile, 'foto');
      }

      const payload = {
        nama: form.nama,
        deskripsi: form.deskripsi,
        harga: form.harga,
        foto: fotoUrl,
        fasilitas: form.fasilitas.split(',').map(f => f.trim()).filter(f => f)
      };

      if (editing) {
        await mutatePenginapan.mutateAsync({ id: editing.id, ...payload });
      } else {
        await mutatePenginapan.mutateAsync({ ...payload });
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan penginapan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const itemToDelete = items.find(i => i.id === deleteId);
        await deletePenginapan.mutateAsync(deleteId);
        
        if (itemToDelete?.foto && itemToDelete.foto.includes('supabase.co')) {
          await deleteImage(itemToDelete.foto, 'foto');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus penginapan.');
      }
    }
    setDeleteId(null);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setForm(f => ({ ...f, foto: URL.createObjectURL(file) }));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Penginapan</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus size={16} className="mr-2" /> Tambah Penginapan</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Tidak ada data penginapan.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(p => (
            <div key={p.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
              <img src={p.foto} alt={p.nama} className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p.harga}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-2">{p.nama}</h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{p.deskripsi}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)}><Pencil size={14} className="mr-1" /> Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteId(p.id)}><Trash2 size={14} className="text-destructive mr-1" /> Hapus</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Penginapan' : 'Tambah Penginapan'}</DialogTitle>
            <DialogDescription>Isi form berikut.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nama Penginapan</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} disabled={isSaving} /></div>
            <div className="space-y-2"><Label>Harga</Label><Input value={form.harga} placeholder="Misal: Rp 200.000 / malam" onChange={e => setForm(f => ({ ...f, harga: e.target.value }))} disabled={isSaving} /></div>
            <div className="space-y-2"><Label>Fasilitas</Label><Input value={form.fasilitas} placeholder="Pisahkan dengan koma (misal: AC, WiFi, Sarapan)" onChange={e => setForm(f => ({ ...f, fasilitas: e.target.value }))} disabled={isSaving} /></div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea rows={4} value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} disabled={isSaving} /></div>
            <div className="space-y-2">
              <Label>Upload Foto</Label>
              <Input type="file" accept="image/*" onChange={handleImage} disabled={isSaving} />
              {form.foto && <img src={form.foto} alt="Preview" className="h-32 rounded-lg object-cover mt-2" />}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} disabled={isSaving}>Batal</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {isSaving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Hapus Penginapan?</DialogTitle><DialogDescription>Data yang dihapus tidak dapat dikembalikan.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPenginapan;
