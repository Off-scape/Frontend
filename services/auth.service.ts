import { api } from "./api";
import { clearToken } from "../utils/authstorage";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id?: string | number;
  name?: string;
  surname?: string;
  email: string;
}

// Backend-in cavabına görə dəqiqləşdirilə bilər
export interface AuthResponse {
  token?: string;
  accessToken?: string;
  user?: AuthUser;
}

/** Cavabdan token-i çıxarır (token və ya accessToken). */
export function extractToken(res: AuthResponse): string | null {
  return res.token ?? res.accessToken ?? null;
}

export const AuthService = {
  register(data: RegisterPayload) {
    return api.post<AuthResponse>("/api/auth/register", data);
  },

  login(data: LoginPayload) {
    return api.post<AuthResponse>("/api/auth/login", data);
  },

  profile() {
    return api.get<AuthUser>("/api/auth/profile");
  },

  async logout() {
    try {
      return await api.post("/api/auth/logout");
    } finally {
      // Server xəta versə belə, lokal token silinməlidir
      clearToken();
    }
  },
};