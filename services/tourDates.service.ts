import { api } from "./api";

export const TourDatesService = {
  getDates(tourId: string) {
    return api.get(`/api/tours/${tourId}/dates`);
  },

  createDate(tourId: string, data: any) {
    return api.post(`/api/tours/${tourId}/dates`, data);
  },

  getDateById(tourId: string, id: string) {
    return api.get(`/api/tours/${tourId}/dates/${id}`);
  },

  updateDate(tourId: string, id: string, data: any) {
    return api.patch(`/api/tours/${tourId}/dates/${id}`, data);
  },

  deleteDate(tourId: string, id: string) {
    return api.delete(`/api/tours/${tourId}/dates/${id}`);
  },
};