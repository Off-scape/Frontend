import { api } from "./api";

export const TourDatesService = {
  getDates(tourId: number) {
    return api.get(`/api/tours/${tourId}/dates`);
  },

  createDate(tourId: number, data: any) {
    return api.post(`/api/tours/${tourId}/dates`, data);
  },

  getDateById(tourId: number, id: number) {
    return api.get(`/api/tours/${tourId}/dates/${id}`);
  },

  updateDate(tourId: number, id: number, data: any) {
    return api.patch(`/api/tours/${tourId}/dates/${id}`, data);
  },

  deleteDate(tourId: number, id: number) {
    return api.delete(`/api/tours/${tourId}/dates/${id}`);
  },
};