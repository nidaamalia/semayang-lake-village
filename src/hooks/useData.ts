import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../lib/api';

export const useWisata = () => useQuery({ queryKey: ['wisata'], queryFn: api.getWisata });
export const useMutateWisata = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertWisata, onSuccess: () => qc.invalidateQueries({ queryKey: ['wisata'] }) });
};
export const useDeleteWisata = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteWisata, onSuccess: () => qc.invalidateQueries({ queryKey: ['wisata'] }) });
};

export const useBerita = () => useQuery({ queryKey: ['berita'], queryFn: api.getBerita });
export const useMutateBerita = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertBerita, onSuccess: () => qc.invalidateQueries({ queryKey: ['berita'] }) });
};
export const useDeleteBerita = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteBerita, onSuccess: () => qc.invalidateQueries({ queryKey: ['berita'] }) });
};

export const useKuliner = () => useQuery({ queryKey: ['kuliner'], queryFn: api.getKuliner });
export const useMutateKuliner = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertKuliner, onSuccess: () => qc.invalidateQueries({ queryKey: ['kuliner'] }) });
};
export const useDeleteKuliner = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteKuliner, onSuccess: () => qc.invalidateQueries({ queryKey: ['kuliner'] }) });
};

export const usePenginapan = () => useQuery({ queryKey: ['penginapan'], queryFn: api.getPenginapan });
export const useMutatePenginapan = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertPenginapan, onSuccess: () => qc.invalidateQueries({ queryKey: ['penginapan'] }) });
};
export const useDeletePenginapan = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deletePenginapan, onSuccess: () => qc.invalidateQueries({ queryKey: ['penginapan'] }) });
};

export const useGaleri = () => useQuery({ queryKey: ['galeri'], queryFn: api.getGaleri });
export const useMutateGaleri = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertGaleri, onSuccess: () => qc.invalidateQueries({ queryKey: ['galeri'] }) });
};
export const useDeleteGaleri = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteGaleri, onSuccess: () => qc.invalidateQueries({ queryKey: ['galeri'] }) });
};

export const usePerangkat = () => useQuery({ queryKey: ['perangkat'], queryFn: api.getPerangkat });
export const useMutatePerangkat = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertPerangkat, onSuccess: () => qc.invalidateQueries({ queryKey: ['perangkat'] }) });
};
export const useDeletePerangkat = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deletePerangkat, onSuccess: () => qc.invalidateQueries({ queryKey: ['perangkat'] }) });
};

export const usePengaturan = () => useQuery({ queryKey: ['pengaturan'], queryFn: api.getPengaturan });
export const useMutatePengaturan = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.upsertPengaturan, onSuccess: () => qc.invalidateQueries({ queryKey: ['pengaturan'] }) });
};
