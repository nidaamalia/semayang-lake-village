import { useState, useRef } from 'react';
import { galeriData, type GaleriFoto } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Trash2, Upload } from 'lucide-react';

const AdminGaleri = () => {
  const [items, setItems] = useState<GaleriFoto[]>(galeriData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      setItems(prev => [...prev, { id: Date.now().toString() + Math.random(), url, caption: file.name.replace(/\.[^/.]+$/, '') }]);
    });
    e.target.value = '';
  };

  const updateCaption = (id: string, caption: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, caption } : i));
  };

  const handleDelete = () => {
    if (deleteId) setItems(prev => prev.filter(i => i.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Galeri</h1>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Button onClick={() => fileRef.current?.click()} className="bg-accent text-accent-foreground hover:bg-accent/90"><Upload size={16} /> Upload Foto</Button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
              const url = URL.createObjectURL(file);
              setItems(prev => [...prev, { id: Date.now().toString() + Math.random(), url, caption: '' }]);
            }
          });
        }}
        className="border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground mb-6 hover:border-accent transition-colors"
      >
        <Upload className="mx-auto mb-2" size={32} />
        <p className="text-sm">Seret & lepas foto di sini, atau klik tombol Upload</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(g => (
          <div key={g.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm group relative">
            <img src={g.url} alt={g.caption} className="w-full h-40 object-cover" />
            <div className="p-3">
              <Input
                value={g.caption}
                onChange={e => updateCaption(g.id, e.target.value)}
                placeholder="Caption..."
                className="text-xs h-8"
              />
            </div>
            <button
              onClick={() => setDeleteId(g.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Hapus Foto?</DialogTitle><DialogDescription>Foto yang dihapus tidak dapat dikembalikan.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGaleri;
