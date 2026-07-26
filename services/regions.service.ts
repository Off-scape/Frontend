import { api } from "./api";

export const RegionsService = {
  getAllRegions() {
    return api.get("/api/regions");
  },

  getRegion(id: string) {
    return api.get(`/api/regions/${id}`);
  },

  updateRegion(id: string, data: any) {
    return api.put(`/api/regions/${id}`, data);
  },

  deleteRegion(id: string) {
    return api.delete(`/api/regions/${id}`);
  },

  createRegion(data: any) {
    return api.post("/api/regions", data);
  }
};