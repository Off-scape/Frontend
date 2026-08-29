import { ReviewsData } from "@/types/Review";
import { api } from "./api";

export const ReviewsService = {


  getReview (id: number) {
    return api.get(`/api/reviews/${id}`);
  },

  updateReview(id: number, data: ReviewsData) {
    return api.patch(`/api/reviews/${id}`, data);
  },

  deleteReview(id: number) {
    return api.delete(`/api/reviews/${id}`);
  },

  createReview(data: ReviewsData) {
    return api.post("/api/reviews", data);
  }
};