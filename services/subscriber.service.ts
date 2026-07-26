import { api } from "./api";

export const SubscriberService = {
  subscribe(data: any) {
    return api.post("/api/subscriber", data);
  },

  unsubscribe() {
    return api.delete("/api/subscriber");
  },

  getSubscribers() {
    return api.get("/api/subscriber");
  },
};