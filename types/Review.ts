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
  user?: { id?: number | string; name?: string; surname?: string };
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

export type CreateReviewInput = {
  tourId: number;
  rating: number;
  comment: string;
};

export type UpdateReviewInput = Partial<Pick<CreateReviewInput, "rating" | "comment">>;
