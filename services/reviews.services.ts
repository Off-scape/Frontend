import { api } from "./api";

export const ReviewsService = {


  getReview (id: string) {
    return api.get(`/api/reviews/${id}`);
  },

  updateReview(id: string, data: any) {
    return api.patch(`/api/reviews/${id}`, data);
  },

  deleteReview(id: string) {
    return api.delete(`/api/reviews/${id}`);
  },

  createReview(data: any) {
    return api.post("/api/reviews", data);
  }
};