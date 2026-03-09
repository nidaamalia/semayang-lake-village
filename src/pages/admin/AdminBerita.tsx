import { useState } from 'react';
import { beritaData, type Berita } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminBerita = () => {
  const [items, setItems] = useState<Berita[]>(beritaData);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Berita | null>(null);
  const [form, setForm] = useState({ judul: '', isi: '', status: 'Draft' as 'Publish' | 'Draft', thumbnail: '' });

  const openNew = () => { setEditing(null); setForm({ judul: '', isi: '', status: 'Draft', thumbnail: '' }); setFormOpen(true); };
  const openEdit = (b: Berita) => { setEditing(b); setForm({ judul: b.judul, isi: b.isi, status: b.status, thumbnail: b.thumbnail }); setFormOpen(true); };

  const handleSave = () => {
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, excerpt: form.isi.slice(0, 100) + '...' } : i));
    } else {
      const newItem: Berita = { id: Date.now().toString(), ...form, tanggal: new Date().toISOString().split('T')[0], excerpt: form.isi.slice(0, 100) + '...' };
      setItems(prev => [newItem, ...prev]);
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setItems(prev => prev.filter(i => i.id !== deleteId));
    setDeleteId(null);
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(f => ({ ...f, thumbnail: url }));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Berita</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus size={16} /> Tambah Berita</Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Judul</TableHead><TableHead>Tanggal</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {items.map(b => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.judul}</TableCell>
                <TableCell>{new Date(b.tanggal).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${b.status === 'Publish' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>{b.status}</span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(b)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(b.id)}><Trash2 size={16} className="text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Form Modal */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Berita' : 'Tambah Berita'}</DialogTitle>
            <DialogDescription>Isi form berikut untuk {editing ? 'mengubah' : 'menambah'} berita.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Judul Berita</Label><Input value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Isi Berita</Label><Textarea rows={5} value={form.isi} onChange={e => setForm(f => ({ ...f, isi: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <Input type="file" accept="image/*" onChange={handleImagePreview} />
              {form.thumbnail && <img src={form.thumbnail} alt="Preview" className="h-32 rounded-lg object-cover mt-2" />}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Publish' | 'Draft' }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="Draft">Draft</option>
                <option value="Publish">Publish</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>Batal</Button>
            <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Berita?</DialogTitle>
            <DialogDescription>Berita yang dihapus tidak dapat dikembalikan.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBerita;
