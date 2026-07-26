import { api } from "./api";

export const TourLikesService = {
  likeTour(data: any) {
    return api.post("/api/tour-likes", data);
  },

  unlikeTour(data?: any) {
    return api.delete("/api/tour-likes", {
      data,
    });
  },
};