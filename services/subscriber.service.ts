import { api } from "./api";

export const SubscriberService = {
  subscribe() {
    return api.post("/api/subscriber");
  },

  unsubscribe() {
    return api.delete("/api/subscriber");
  },
};
