import { supabase } from './supabase';
import imageCompression from 'browser-image-compression';
import { Wisata, Berita, Kuliner, Penginapan, GaleriFoto, Perangkat } from '../data/dummy';

// Upload function with auto compression
export const uploadImage = async (file: File, bucket: string = 'foto') => {
  try {
    let fileToUpload = file;
    
    // Check if file is larger than 1MB (1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      console.log(`File is ${Math.round(file.size/1024/1024)}MB, compressing before upload...`);
      const options = {
        maxSizeMB: 1, // Max 1MB
        maxWidthOrHeight: 1920, // Web standard max res
        useWebWorker: true
      };
      
      const compressedBlob = await imageCompression(file, options);
      
      // Convert Blob back to File
      fileToUpload = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
      });
      console.log(`Compressed down to ${Math.round(fileToUpload.size/1024)}KB`);
    }

    const fileExt = fileToUpload.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, fileToUpload);
    if (error) {
      throw error;
    }
    
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error('Error in upload process:', err);
    throw err;
  }
};

export const deleteImage = async (url: string, bucket: string = 'foto') => {
  try {
    // Extract file path from URL
    // URL format is usually: .../storage/v1/object/public/bucket_name/file_name.ext
    const urlParts = url.split('/');
    const fileName = urlParts.pop(); // Get just the filename
    
    if (fileName) {
      const { error } = await supabase.storage.from(bucket).remove([fileName]);
      if (error) throw error;
      console.log(`Successfully deleted ${fileName} from storage`);
    }
  } catch (err) {
    console.error('Error deleting image from storage:', err);
  }
};

// Generic type to remove 'id' from insert
type InsertType<T> = Omit<T, 'id'> & { id?: string };

// Wisata
export const getWisata = async (): Promise<Wisata[]> => {
  const { data, error } = await supabase.from('wisata').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Wisata[];
};
export const upsertWisata = async (wisata: InsertType<Wisata>) => {
  const { data, error } = await supabase.from('wisata').upsert(wisata).select().single();
  if (error) throw error;
  return data;
};
export const deleteWisata = async (id: string) => {
  const { error } = await supabase.from('wisata').delete().eq('id', id);
  if (error) throw error;
};

// Berita
export const getBerita = async (): Promise<Berita[]> => {
  const { data, error } = await supabase.from('berita').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Berita[];
};
export const upsertBerita = async (berita: InsertType<Berita>) => {
  const { data, error } = await supabase.from('berita').upsert(berita).select().single();
  if (error) throw error;
  return data;
};
export const deleteBerita = async (id: string) => {
  const { error } = await supabase.from('berita').delete().eq('id', id);
  if (error) throw error;
};

// Kuliner
export const getKuliner = async (): Promise<Kuliner[]> => {
  const { data, error } = await supabase.from('kuliner').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Kuliner[];
};
export const upsertKuliner = async (kuliner: InsertType<Kuliner>) => {
  const { data, error } = await supabase.from('kuliner').upsert(kuliner).select().single();
  if (error) throw error;
  return data;
};
export const deleteKuliner = async (id: string) => {
  const { error } = await supabase.from('kuliner').delete().eq('id', id);
  if (error) throw error;
};

// Penginapan
export const getPenginapan = async (): Promise<Penginapan[]> => {
  const { data, error } = await supabase.from('penginapan').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Penginapan[];
};
export const upsertPenginapan = async (penginapan: InsertType<Penginapan>) => {
  const { data, error } = await supabase.from('penginapan').upsert(penginapan).select().single();
  if (error) throw error;
  return data;
};
export const deletePenginapan = async (id: string) => {
  const { error } = await supabase.from('penginapan').delete().eq('id', id);
  if (error) throw error;
};

// Galeri
export const getGaleri = async (): Promise<GaleriFoto[]> => {
  const { data, error } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  // map url correctly based on dummy interface
  return data as GaleriFoto[];
};
export const upsertGaleri = async (galeri: InsertType<GaleriFoto>) => {
  const { data, error } = await supabase.from('galeri').upsert(galeri).select().single();
  if (error) throw error;
  return data;
};
export const deleteGaleri = async (id: string) => {
  const { error } = await supabase.from('galeri').delete().eq('id', id);
  if (error) throw error;
};

// Perangkat
export const getPerangkat = async (): Promise<Perangkat[]> => {
  const { data, error } = await supabase.from('perangkat').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Perangkat[];
};
export const upsertPerangkat = async (perangkat: InsertType<Perangkat>) => {
  const { data, error } = await supabase.from('perangkat').upsert(perangkat).select().single();
  if (error) throw error;
  return data;
};
export const deletePerangkat = async (id: string) => {
  const { error } = await supabase.from('perangkat').delete().eq('id', id);
  if (error) throw error;
};

// Pengaturan Web
export const getPengaturan = async () => {
  try {
    const { data, error } = await supabase.from('pengaturan').select('*').order('id', { ascending: true });
    if (error) {
      console.warn("Table pengaturan not found or error, using fallback.");
      throw error;
    }
    return data;
  } catch (err) {
    // Fallback if table doesn't exist yet
    const local = localStorage.getItem('pengaturan_fallback');
    if (local) return JSON.parse(local);
    return [];
  }
};

export const upsertPengaturan = async (pengaturan: any) => {
  try {
    if (!pengaturan.id) pengaturan.id = 1;
    const { data, error } = await supabase.from('pengaturan').upsert(pengaturan).select().single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Table pengaturan not found or error, saving to fallback.");
    localStorage.setItem('pengaturan_fallback', JSON.stringify([pengaturan]));
    return pengaturan;
  }
};

