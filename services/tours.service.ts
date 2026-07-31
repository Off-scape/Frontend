import { api } from "./api";

export const ToursService = {
  getAllTours() {
    return api.get("/api/tours");
  },

  getTour(id: number | string) {
    return api.get(`/api/tours/${id}`);
  },

  updateTour(id: string, data: any) {
    return api.patch(`/api/tours/${id}`, data,);
  },

  deleteTour(id: string) {
    return api.delete(`/api/tours/${id}`);
  },

  createTour(data: any) {
    return api.post("/api/tours", data);
  }
};