import { useState } from 'react';
import { type Kuliner } from '@/data/dummy';
import { useKuliner, useMutateKuliner, useDeleteKuliner } from '@/hooks/useData';
import { uploadImage, deleteImage } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Utensils } from 'lucide-react';

const AdminKuliner = () => {
  const { data: items = [], isLoading } = useKuliner();
  const mutateKuliner = useMutateKuliner();
  const deleteKuliner = useDeleteKuliner();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Kuliner | null>(null);
  const [form, setForm] = useState({ nama: '', deskripsi: '', foto: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openNew = () => { 
    setEditing(null); 
    setForm({ nama: '', deskripsi: '', foto: '' }); 
    setImageFile(null);
    setFormOpen(true); 
  };

  const openEdit = (k: Kuliner) => { 
    setEditing(k); 
    setForm({ nama: k.nama, deskripsi: k.deskripsi, foto: k.foto }); 
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
        foto: fotoUrl
      };

      if (editing) {
        await mutateKuliner.mutateAsync({ id: editing.id, ...payload });
      } else {
        await mutateKuliner.mutateAsync({ ...payload });
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan kuliner.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const itemToDelete = items.find(i => i.id === deleteId);
        await deleteKuliner.mutateAsync(deleteId);
        
        if (itemToDelete?.foto && itemToDelete.foto.includes('supabase.co')) {
          await deleteImage(itemToDelete.foto, 'foto');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus kuliner.');
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
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Kuliner</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus size={16} className="mr-2" /> Tambah Kuliner</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Tidak ada data kuliner.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(k => (
            <div key={k.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
              <img src={k.foto} alt={k.nama} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground mt-2">{k.nama}</h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{k.deskripsi}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => openEdit(k)}><Pencil size={14} className="mr-1" /> Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteId(k.id)}><Trash2 size={14} className="text-destructive mr-1" /> Hapus</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Kuliner' : 'Tambah Kuliner'}</DialogTitle>
            <DialogDescription>Isi form berikut.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nama Kuliner</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} disabled={isSaving} /></div>
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
          <DialogHeader><DialogTitle>Hapus Kuliner?</DialogTitle><DialogDescription>Data yang dihapus tidak dapat dikembalikan.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKuliner;
