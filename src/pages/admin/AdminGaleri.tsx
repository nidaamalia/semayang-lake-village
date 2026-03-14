import { useState, useRef } from 'react';
import { type GaleriFoto } from '@/data/dummy';
import { useGaleri, useMutateGaleri, useDeleteGaleri } from '@/hooks/useData';
import { uploadImage, deleteImage } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Trash2, Upload, Loader2 } from 'lucide-react';

const CaptionInput = ({ g, onSave }: { g: GaleriFoto, onSave: (id: string, caption: string) => void }) => {
  const [val, setVal] = useState(g.caption || '');
  return (
    <Input
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => onSave(g.id, val)}
      placeholder="Caption..."
      className="text-xs h-8"
    />
  );
};

const AdminGaleri = () => {
  const { data: items = [], isLoading } = useGaleri();
  const mutateGaleri = useMutateGaleri();
  const deleteGaleri = useDeleteGaleri();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    try {
      await Promise.all(Array.from(files).map(async (file) => {
        if (!file.type.startsWith('image/')) return;
        const url = await uploadImage(file, 'foto');
        await mutateGaleri.mutateAsync({ url, caption: file.name.replace(/\.[^/.]+$/, '') });
      }));
    } catch (err) {
      console.error(err);
      alert('Gagal mengupload foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const updateCaption = async (id: string, caption: string) => {
    try {
      await mutateGaleri.mutateAsync({ id, caption, url: items.find(i => i.id === id)?.url || '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const itemToDelete = items.find(i => i.id === deleteId);
        await deleteGaleri.mutateAsync(deleteId);
        
        // Delete the image from Supabase Storage
        if (itemToDelete?.url) {
          // Hanya hapus jika URL berasal dari Supabase Storage
          if (itemToDelete.url.includes('supabase.co')) {
            await deleteImage(itemToDelete.url, 'foto');
          }
        }
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus foto.');
      }
    }
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Kelola Galeri</h1>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={isUploading} />
          <Button onClick={() => fileRef.current?.click()} disabled={isUploading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isUploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Upload size={16} className="mr-2" />}
            Upload Foto
          </Button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground mb-6 hover:border-accent transition-colors"
      >
        {isUploading ? (
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-2 text-accent" size={32} />
            <p className="text-sm">Mengupload foto, harap tunggu...</p>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto mb-2" size={32} />
            <p className="text-sm">Seret & lepas foto di sini, atau klik tombol Upload</p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Galeri kosong.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(g => (
            <div key={g.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm group relative">
              <img src={g.url} alt={g.caption} className="w-full h-40 object-cover" />
              <div className="p-3">
                <CaptionInput g={g} onSave={updateCaption} />
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
      )}

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
