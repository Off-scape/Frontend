import type { CreateReviewInput, UpdateReviewInput, Review } from "@/types/Review";
import { api } from "./api";

export const ReviewsService = {
  getReview(tourId: number) {
    return api.get<{ success?: boolean; data: Review[] }>(`/api/reviews/${tourId}`);
  },

  updateReview(id: number, data: UpdateReviewInput) {
    return api.patch(`/api/reviews/${id}`, data);
  },

  deleteReview(id: number) {
    return api.delete(`/api/reviews/${id}`);
  },

  createReview(data: CreateReviewInput) {
    return api.post("/api/reviews", data);
  }
};
