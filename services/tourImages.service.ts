import { api } from "./api";

export const TourImagesService = {
  getImages(tourId: string) {
    return api.get(`/api/tours/${tourId}/images`);
  },

  addImage(tourId: string, data: any) {
    return api.post(`/api/tours/${tourId}/images`, data);
  },

  updateImage(tourId: string, id: string, data: any) {
    return api.patch(`/api/tours/${tourId}/images/${id}`, data);
  },

  deleteImage(tourId: string, id: string) {
    return api.delete(`/api/tours/${tourId}/images/${id}`);
  },
};