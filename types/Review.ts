export type Review = {
  id: number;
  comment: string;
  rating: number;
  tourId: number;
  tour_id: number;
  userId: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export type ReviewsData =
  {
    tourId: number,
    rating: number,
    comment: string
  }
