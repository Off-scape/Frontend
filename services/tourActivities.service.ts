import { api } from "./api";

export const TourActivitiesService = {
  addActivity(tourId: string, data: any) {
    return api.post(`/api/tours/${tourId}/activities`, data);
  },

  removeActivity(tourId: string, activityId: string) {
    return api.delete(`/api/tours/${tourId}/activities/${activityId}`);
  },
};