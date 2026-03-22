import { Tour } from '@/types/Tour';

// ─────────────────────────────────────────────────────────────────────────────
// Mock data — backend hazır deyil, hələlik bunlar istifadə olunur.
// Backend hazır olanda yalnız aşağıdakı 2 funksiyanı dəyiş (getTours, getTourById).
// ─────────────────────────────────────────────────────────────────────────────

export const mockNatureTours: Tour[] = [
  {
      id: 'n1',
      type: 'nature',
      image: '/common/assets/images/tours/nature-susa.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Şuşa Kampı - Camping Turu',
      organizer: 'Offline Life Retreats',
      location: 'Şuşa',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'n1-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Ayla' },
          { id: 'n1-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Məhəmməd' },
          { id: 'n1-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Zeynəb' },
          { id: 'n1-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Rəşad' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'n2',
      type: 'nature',
      image: '/common/assets/images/tours/nature-forest.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Xızı, Altıağac - Camping Turu',
      organizer: 'Offline Life Retreats',
      location: 'Xızı',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'n2-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Rəşad' },
          { id: 'n2-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Səbinə' },
          { id: 'n2-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Elvin' },
          { id: 'n2-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Günel' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'n3',
      type: 'nature',
      image: '/common/assets/images/tours/nature-mountain.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Qızılqaya - Dağda Hiking',
      organizer: 'Offline Life Retreats',
      location: 'Qızılqaya',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'n3-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Turan' },
          { id: 'n3-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Günay' },
          { id: 'n3-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Kamran' },
          { id: 'n3-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Sevda' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'n4',
      type: 'nature',
      image: '/common/assets/images/tours/nature-hiking.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Lahıc - Dağda Hiking',
      organizer: 'Offline Life Retreats',
      location: 'Lahıc',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'n4-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Nigar' },
          { id: 'n4-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Orxan' },
          { id: 'n4-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Leyla' },
          { id: 'n4-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Arzu' },
      ],
      currency: '',
      description: ''
  },
];

export const mockActivityTours: Tour[] = [
  {
      id: 'a1',
      type: 'activity',
      image: '/common/assets/images/tours/activity1.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Atletik - Qrup oyunları',
      organizer: 'Offline Life Retreats',
      location: 'Grounded',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'a1-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Ali' },
          { id: 'a1-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Aysel' },
          { id: 'a1-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Elvin' },
          { id: 'a1-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Günel' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'a2',
      type: 'activity',
      image: '/common/assets/images/tours/activity2.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Atletik - Qrup oyunları',
      organizer: 'Offline Life Retreats',
      location: 'Grounded',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'a2-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Nigar' },
          { id: 'a2-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Tural' },
          { id: 'a2-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Leyla' },
          { id: 'a2-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Rəşad' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'a3',
      type: 'activity',
      image: '/common/assets/images/tours/activity3.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Atletik - Qrup oyunları',
      organizer: 'Offline Life Retreats',
      location: 'Grounded',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'a3-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Kamran' },
          { id: 'a3-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Sevda' },
          { id: 'a3-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Rəşad' },
          { id: 'a3-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Günel' },
      ],
      currency: '',
      description: ''
  },
  {
      id: 'a4',
      type: 'activity',
      image: '/common/assets/images/tours/activity4.jpg',
      price: 50,
      date: '29 Noy 2025',
      time: '08:00',
      activity: 'Atletik - Qrup oyunları',
      organizer: 'Offline Life Retreats',
      location: 'Grounded',
      participantCount: 10,
      isVisible: true,
      participants: [
          { id: 'a4-1', avatar: '/common/assets/images/avatars/avatar1.jpg', name: 'Günel' },
          { id: 'a4-2', avatar: '/common/assets/images/avatars/avatar2.jpg', name: 'Orxan' },
          { id: 'a4-3', avatar: '/common/assets/images/avatars/avatar3.jpg', name: 'Arzu' },
          { id: 'a4-4', avatar: '/common/assets/images/avatars/avatar4.jpg', name: 'Leyla' },
      ],
      currency: '',
      description: ''
  },
];

export const mockDetailTour: Tour = {
    id: 'tour-001',
    type: 'nature',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    price: 299,
    date: '15 İyul 2025',
    time: '07:00',
    activity: 'Şahdağ tabiatında fərqli hiking turu',
    organizer: 'Offline Life Retreats',
    location: 'Şahdağ, Azərbaycan',
    participantCount: 8,
    isVisible: true,
    participants: [
        { id: 'p1', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', name: 'Ayla' },
        { id: 'p2', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80', name: 'Bəhruz' },
        { id: 'p3', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80', name: 'Nigar' },
        { id: 'p4', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', name: 'Orxan' },
    ],
    title: 'Şahdağ tabiatında fərqli hiking turu',
    description: 'Şahdağın möhtəşəm təbiəti ilə tanış olun. Bu tur sizə dağların zirvəsinə qalxmaq, təmiz hava udmaq və unudulmaz mənzərələrə şahid olmaq imkanı verir.',
    duration: '3 gün / 2 gecə',
    rating: 5.0,
    reviewCount: 4,
    difficulty: 'moderate',
    maxGroupSize: 12,
    images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    ],
    tags: [
        { id: 't1', label: 'Hiking', color: '#2D6A4F' },
        { id: 't2', label: 'Təbiət', color: '#40916C' },
        { id: 't3', label: 'Adventure', color: '#1B4332' },
        { id: 't4', label: 'Qrup turu', color: '#52B788' },
    ],
    highlights: [
        'Şahdağın zirvəsinə qalxmaq',
        'Şəlalə və göllərə baş çəkmək',
        'Peşəkar rehbər dəstəyi',
        'Çadır gecəsi təcrübəsi',
        'Dağ mətbəxindən yerli yeməklər',
    ],
    requirements: [
        'Minimum 16 yaş tələb olunur',
        'Orta fiziki hazırlıq',
        'Rahat gəzinti ayaqqabısı',
        'Su keçirməyən geyim tövsiyə olunur',
    ],
    dates: [
        { id: 'd1', date: '2025-07-15', availableSpots: 4, totalSpots: 12 },
        { id: 'd2', date: '2025-07-22', availableSpots: 8, totalSpots: 12 },
        { id: 'd3', date: '2025-08-05', availableSpots: 12, totalSpots: 12 },
        { id: 'd4', date: '2025-08-19', availableSpots: 0, totalSpots: 12 },
        { id: 'd5', date: '2025-09-02', availableSpots: 10, totalSpots: 12 },
    ],
    instructor: {
        id: 'i1',
        name: 'Bəhruz Tənioğlu',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        bio: '10+ illik dağ turizmi təcrübəsinə malik peşəkar rehbər. Azərbaycanın bütün milli parklarında sertifikatlaşdırılmış tur rəhbəri.',
        experience: '10+ il',
        specialization: 'Dağ Trekkinqi & Vəhşi Təbiət',
    },
    itinerary: [
        { id: 'it1', day: 1, title: 'Bakıdan Şahdağa', description: 'Səhər saat 07:00-da Bakıdan yola düşürük. Yol boyu mənzərəli dağ kəndlərindən keçirik.', time: '07:00', location: 'Bakı → Quba → Şahdağ' },
        { id: 'it2', day: 2, title: 'Zirvəyə qalxış', description: 'Erkən səhər 3500m zirvəyə doğru yürüşümüzü başlayırıq.', time: '06:00', location: 'Base Camp → Zirvə 3547m' },
        { id: 'it3', day: 3, title: 'Şəlalə marşrutu & qayıdış', description: 'Son günümüzü gizli şəlaləni ziyarət edərək keçiririk. Öğlə yeməyindən sonra Bakıya qayıdırıq.', time: '09:00', location: 'Şəlalə cığırı → Bakı' },
    ],
    reviews: [
        { id: 'r1', author: 'Ilkin', rating: 5, comment: 'Möhtəşəm tur! Hər şey mükəmməl təşkil edilmişdi.', date: '2023-08-25' },
        { id: 'r2', author: 'Məmmədoğlu', rating: 5, comment: 'Bəhruz müəllim çox peşəkar rehbərdir, tövsiyə edirəm.', date: '2023-09-05' },
        { id: 'r3', author: 'Süleyman', rating: 5, comment: 'Unudulmaz təcrübə. Mütləq yenidən qatılacağam!', date: '2023-09-12' },
        { id: 'r4', author: 'Nigar', rating: 5, comment: 'Şahdağ bu qədər gözəldir bilmirdim. Mükəmməl organizasiya.', date: '2023-09-19' },
    ],
    currency: ''
};

export const mockTours: Tour[] = [
  ...mockNatureTours,
  ...mockActivityTours,
  mockDetailTour,
];

// Backend hazır olanda yalnız bu 2 funksiyanın içini dəyiş:
export async function getTours(type?: Tour['type']): Promise<Tour[]> {
  const all = [...mockNatureTours, ...mockActivityTours];
  return type ? all.filter((t) => t.type === type && t.isVisible !== false) : all;
}

export async function getTourById(id: string): Promise<Tour> {
  const tour = mockTours.find((t) => t.id === id);
  if (!tour) throw new Error(`"${id}" id-li tur tapılmadı`);
  return tour;
}