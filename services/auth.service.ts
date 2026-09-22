import { api } from "./api";

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

// Token body-də gəlmir (HttpOnly cookie ilə gedir), yalnız user qayıdır
export interface AuthResponse {
  user?: AuthUser;  
}

export const AuthService = {
  register(data: RegisterPayload) {
    return api.post<AuthResponse>("/auth/register", data);
  },

  login(data: LoginPayload) {
    return api.post<AuthResponse>("/auth/login", data);
  },

  getMe() {
    return api.get<AuthUser>("/auth/me");
  },

  logout() {
    return api.post("/auth/logout");
  },
};