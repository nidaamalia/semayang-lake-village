import { useState } from 'react';
import { wisataData, type Wisata } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminWisata = () => {
  const [items, setItems] = useState<Wisata[]>(wisataData);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Wisata | null>(null);
  const [form, setForm] = useState({ nama: '', deskripsi: '', foto: '', kategori: 'Alam' as Wisata['kategori'] });

  const openNew = () => { setEditing(null); setForm({ nama: '', deskripsi: '', foto: '', kategori: 'Alam' }); setFormOpen(true); };
  const openEdit = (w: Wisata) => { setEditing(w); setForm({ nama: w.nama, deskripsi: w.deskripsi, foto: w.foto, kategori: w.kategori }); setFormOpen(true); };

  const handleSave = () => {
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), ...form }]);
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setItems(prev => prev.filter(i => i.id !== deleteId));
    setDeleteId(null);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm(f => ({ ...f, foto: URL.createObjectURL(file) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Wisata</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus size={16} /> Tambah Wisata</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(w => (
          <div key={w.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
            <img src={w.foto} alt={w.nama} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{w.kategori}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-2">{w.nama}</h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{w.deskripsi}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => openEdit(w)}><Pencil size={14} /> Edit</Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteId(w.id)}><Trash2 size={14} className="text-destructive" /> Hapus</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Wisata' : 'Tambah Wisata'}</DialogTitle>
            <DialogDescription>Isi form berikut.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nama Wisata</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea rows={4} value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>Upload Foto</Label>
              <Input type="file" accept="image/*" onChange={handleImage} />
              {form.foto && <img src={form.foto} alt="Preview" className="h-32 rounded-lg object-cover mt-2" />}
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <select value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value as Wisata['kategori'] }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="Alam">Alam</option>
                <option value="Budaya">Budaya</option>
                <option value="Kuliner">Kuliner</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>Batal</Button>
            <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Hapus Wisata?</DialogTitle><DialogDescription>Data yang dihapus tidak dapat dikembalikan.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWisata;
