import { api } from "./api";

export const ActivitiesService = {
  getAllActivities() {
    return api.get("/api/activities");
  },

  getActivity(id: string) {
    return api.get(`/api/activities/${id}`);
  },

  updateActivity(id: string, data: any) {
    return api.patch(`/api/activities/${id}`, data);
  },

  deleteActivity(id: string) {
    return api.delete(`/api/activities/${id}`);
  },

  createActivity(data: any) {
    return api.post("/api/activities", data);
  },
  getActivitiesByRegion(regionId: string) {
    return api.get(`/api/activities/slug/${regionId}`);
  }
};