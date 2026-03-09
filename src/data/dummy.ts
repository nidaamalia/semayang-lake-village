export interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  foto: string;
  kategori: 'Alam' | 'Budaya' | 'Kuliner';
}

export interface Berita {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  thumbnail: string;
  status: 'Publish' | 'Draft';
  excerpt: string;
}

export interface Kuliner {
  id: string;
  nama: string;
  deskripsi: string;
  foto: string;
}

export interface Penginapan {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
  foto: string;
  fasilitas: string[];
}

export interface GaleriFoto {
  id: string;
  url: string;
  caption: string;
}

export interface Perangkat {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
}

export const wisataData: Wisata[] = [
  { id: '1', nama: 'Wisata Perahu Danau Semayang', deskripsi: 'Jelajahi keindahan Danau Semayang dengan perahu tradisional. Nikmati pemandangan hutan rawa dan kehidupan nelayan yang autentik.', foto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', kategori: 'Alam' },
  { id: '2', nama: 'Sunset & Sunrise di Tepian Danau', deskripsi: 'Saksikan langit Kalimantan berubah warna di tepian danau yang tenang. Momen magis yang tak terlupakan.', foto: 'https://images.unsplash.com/photo-1500375592497-5e01611a4a47?w=600', kategori: 'Alam' },
  { id: '3', nama: 'Jembatan Gantung', deskripsi: 'Jembatan kayu tradisional yang menghubungkan rumah-rumah terapung. Spot foto ikonik desa.', foto: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600', kategori: 'Budaya' },
  { id: '4', nama: 'Spot Pemancingan', deskripsi: 'Rasakan sensasi memancing ikan air tawar di danau yang kaya akan keanekaragaman hayati.', foto: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600', kategori: 'Alam' },
  { id: '5', nama: 'Menyaksikan Pesut', deskripsi: 'Pesut Mahakam, lumba-lumba air tawar langka yang menjadi kebanggaan Kalimantan Timur.', foto: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', kategori: 'Alam' },
  { id: '6', nama: 'Susur Sungai Mahakam', deskripsi: 'Telusuri Sungai Mahakam yang legendaris dan saksikan kehidupan masyarakat tepian sungai.', foto: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600', kategori: 'Alam' },
];

export const kulinerData: Kuliner[] = [
  { id: '1', nama: 'Ikan Toman Bakar', deskripsi: 'Ikan toman segar dari danau, dibakar dengan bumbu khas Dayak. Dagingnya tebal dan gurih, disajikan dengan sambal terasi.', foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600' },
  { id: '2', nama: 'Ikan Jelawat', deskripsi: 'Ikan jelawat yang dimasak dengan berbagai cara — gulai, pepes, atau goreng kering. Raja ikan air tawar Kalimantan.', foto: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600' },
  { id: '3', nama: 'Ikan Haruan', deskripsi: 'Gabus Kalimantan yang terkenal lezat. Dimasak dalam kuah kuning atau digoreng garing, selalu bikin rindu.', foto: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600' },
  { id: '4', nama: 'Udang Galah', deskripsi: 'Udang raksasa dari sungai Mahakam. Dibakar atau dimasak saus padang, menjadi hidangan istimewa.', foto: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600' },
];

export const penginapanData: Penginapan[] = [
  { id: '1', nama: 'Pondok Danau Semayang', deskripsi: 'Cottage sederhana di tepi danau dengan pemandangan langsung ke perairan. Bangun pagi dengan suara air dan kicau burung.', harga: 'Rp 250.000 / malam', foto: 'https://images.unsplash.com/photo-1499793983394-12903e7e0861?w=600', fasilitas: ['Kamar Mandi Dalam', 'Kipas Angin', 'Sarapan'] },
  { id: '2', nama: 'Homestay Pak Raden', deskripsi: 'Tinggal bersama keluarga nelayan lokal. Pengalaman autentik merasakan kehidupan desa terapung.', harga: 'Rp 150.000 / malam', foto: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', fasilitas: ['Makan 3x', 'Tur Desa', 'Perahu'] },
  { id: '3', nama: 'Lanting Wisata', deskripsi: 'Rumah terapung (lanting) yang disulap menjadi penginapan unik. Tidur di atas air dengan langit berbintang.', harga: 'Rp 300.000 / malam', foto: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600', fasilitas: ['AC', 'Kamar Mandi', 'Sarapan', 'WiFi'] },
];

export const beritaData: Berita[] = [
  { id: '1', judul: 'Festival Danau Semayang 2026 Segera Digelar', isi: 'Festival tahunan yang menampilkan lomba perahu, pertunjukan seni tradisional, dan pameran kuliner khas danau.', tanggal: '2026-03-01', thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', status: 'Publish', excerpt: 'Festival tahunan yang menampilkan lomba perahu dan pertunjukan seni tradisional...' },
  { id: '2', judul: 'Pembangunan Dermaga Wisata Baru', isi: 'Pemerintah daerah meresmikan dermaga wisata baru untuk memudahkan akses pengunjung ke Danau Semayang.', tanggal: '2026-02-15', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', status: 'Publish', excerpt: 'Dermaga wisata baru diresmikan untuk memudahkan akses pengunjung...' },
  { id: '3', judul: 'Pelatihan Pemandu Wisata Lokal', isi: 'Warga desa mengikuti pelatihan pemandu wisata untuk meningkatkan kualitas pelayanan kepada wisatawan.', tanggal: '2026-02-01', thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600', status: 'Publish', excerpt: 'Warga desa mengikuti pelatihan untuk meningkatkan kualitas pelayanan...' },
  { id: '4', judul: 'Konservasi Pesut Mahakam di Danau Semayang', isi: 'Program konservasi pesut Mahakam yang melibatkan nelayan lokal sebagai pengawas habitat alami.', tanggal: '2026-01-20', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', status: 'Draft', excerpt: 'Program konservasi pesut yang melibatkan nelayan lokal...' },
];

export const galeriData: GaleriFoto[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1500375592497-5e01611a4a47?w=600', caption: 'Sunset di Danau Semayang' },
  { id: '2', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', caption: 'Perahu nelayan tradisional' },
  { id: '3', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600', caption: 'Rumah terapung (lanting)' },
  { id: '4', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600', caption: 'Sungai Mahakam dari atas' },
  { id: '5', url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600', caption: 'Jembatan kayu desa' },
  { id: '6', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', caption: 'Kuliner khas danau' },
  { id: '7', url: 'https://images.unsplash.com/photo-1499793983394-12903e7e0861?w=600', caption: 'Pagi di tepian danau' },
  { id: '8', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', caption: 'Kehidupan desa' },
  { id: '9', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', caption: 'Kekayaan alam Semayang' },
];

export const perangkatData: Perangkat[] = [
  { id: '1', nama: 'H. Muhammad Yusuf', jabatan: 'Kepala Desa', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: '2', nama: 'Siti Aminah', jabatan: 'Sekretaris Desa', foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: '3', nama: 'Ahmad Ridwan', jabatan: 'Ketua BPD', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { id: '4', nama: 'Hj. Fatimah', jabatan: 'Ketua PKK', foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  { id: '5', nama: 'Syahrul Ramadan', jabatan: 'Ketua Pokdarwis Dikmalestari', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
];
