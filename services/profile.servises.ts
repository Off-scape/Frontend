import { api } from "./api";

export const ProfileService = {
  getProfile (id: string) {
    return api.get(`/api/profile/${id}`);
  },

  updateProfile( data: any) {
    return api.patch(`/api/profile`, data);
  },

  deleteProfileAvatar() {
    return api.delete(`/api/profile/avatar`);
  },

  createProfileAvatar(data: any) {
    return api.post("/api/profile/avatar", data);
  }
};