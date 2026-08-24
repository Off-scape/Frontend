import { api } from "./api";
export interface GetToursQueryParams {
  regionId?: number;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
}
export const ToursService = {
  getAllTours(params?: GetToursQueryParams) {
    return api.get("/api/tours", { params });
  },
  getTour(id: string) {
    return api.get(`/api/tours/${id}`);
  },

  updateTour(id: string, data: any) {
    return api.patch(`/api/tours/${id}`, data);
  },

  deleteTour(id: string) {
    return api.delete(`/api/tours/${id}`);
  },

  createTour(data: any) {
    return api.post("/api/tours", data);
  }
};