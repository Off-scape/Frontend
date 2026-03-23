import { Review, RatingSummary } from "@/types/Review";

export const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "İlkin",
    userAvatar: "",
    userInitial: "İ",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Noyabr 28, 2025",
    comment: "Əntüqə))",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Məmmədağa",
    userAvatar: "",
    userInitial: "M",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Noyabr 28, 2025",
    comment: "AAA AAAA )))",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Süleyman",
    userAvatar: "",
    userInitial: "S",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Noyabr 28, 2025",
    comment: "Yaxşıdı ee prosta gif olsa əla olar ee brat",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Nigar",
    userAvatar: "",
    userInitial: "N",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Noyabr 28, 2025",
    comment: `Süleymanla danışdıq, qərara gəldik: sayt açılsın, əvvəl mövzuya uyğun GIF çıxsın,
sonra landing gəlsin — yoxsa indi birbaşa turlar fırladır, elə bil Teipsome açmışıq`,
  },
  {
    id: "5",
    userId: "user5",
    userName: "Xətai",
    userAvatar: "",
    userInitial: "X",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Noyabr 28, 2025",
    comment:
      "Düşünürəm belede pis deyil. Bilirsiz əsas Marketing lazımdır bizə.",
  },
];

export const ratingSummary: RatingSummary = {
  averageRating: 5.0,
  totalReviews: 5,
  ratingDistribution: [
    { rating: 5, count: 5, percentage: 100 },
    { rating: 4, count: 0, percentage: 0 },
    { rating: 3, count: 0, percentage: 0 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 },
  ],
};
