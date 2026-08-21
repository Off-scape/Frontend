import { api } from "./api";

export const HomeService = {
  getHomeData() {
    return api.get("/api/home");
  },

  healthCheck() {
    return api.get("/api/health");
  },
};
