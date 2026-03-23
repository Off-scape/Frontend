export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userInitial: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}
