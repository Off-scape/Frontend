import { api } from "./api";

export const UserActivitiesService = {
  getLikedTours() {
    return api.get("/api/user-activities/liked");
  },

  getJoinedTours() {
    return api.get("/api/user-activities/joined");
  },
};