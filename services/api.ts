import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-production-4afd.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {

  const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzg1NDM2OTc1LCJleHAiOjE3ODYwNDE3NzV9.PFyvHOBs0Wv3amgNHFN0MRhCT2Qal5DRDlFuwS0Zi88"
    // typeof window !== "undefined"
    //   ? localStorage.getItem("token")
    //   : null;

  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : null;


  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);
