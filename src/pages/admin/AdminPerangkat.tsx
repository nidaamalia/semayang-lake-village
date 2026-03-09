import { useState } from 'react';
import { perangkatData, type Perangkat } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminPerangkat = () => {
  const [items, setItems] = useState<Perangkat[]>(perangkatData);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Perangkat | null>(null);
  const [form, setForm] = useState({ nama: '', jabatan: '', foto: '' });

  const openNew = () => { setEditing(null); setForm({ nama: '', jabatan: '', foto: '' }); setFormOpen(true); };
  const openEdit = (p: Perangkat) => { setEditing(p); setForm({ nama: p.nama, jabatan: p.jabatan, foto: p.foto }); setFormOpen(true); };

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
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Perangkat Desa</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus size={16} /> Tambah Perangkat</Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Foto</TableHead><TableHead>Nama</TableHead><TableHead>Jabatan</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {items.map(p => (
              <TableRow key={p.id}>
                <TableCell><img src={p.foto} alt={p.nama} className="w-10 h-10 rounded-full object-cover" /></TableCell>
                <TableCell className="font-medium">{p.nama}</TableCell>
                <TableCell>{p.jabatan}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)}><Trash2 size={16} className="text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Perangkat' : 'Tambah Perangkat'}</DialogTitle>
            <DialogDescription>Isi data perangkat desa.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Jabatan</Label><Input value={form.jabatan} onChange={e => setForm(f => ({ ...f, jabatan: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>Upload Foto</Label>
              <Input type="file" accept="image/*" onChange={handleImage} />
              {form.foto && <img src={form.foto} alt="Preview" className="w-16 h-16 rounded-full object-cover mt-2" />}
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
          <DialogHeader><DialogTitle>Hapus Perangkat?</DialogTitle><DialogDescription>Data yang dihapus tidak dapat dikembalikan.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPerangkat;
