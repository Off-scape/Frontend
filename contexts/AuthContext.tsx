"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/services/api";
import { AuthService, type AuthUser, type LoginPayload } from "@/services/auth.service";
import { extractAuthUser } from "@/utils/adminAuth";

export type AuthStatus = "loading" | "guest" | "deactivated" | "ready" | "error";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  pathReady: boolean;
  notification: string | null;
  refresh: () => Promise<AuthUser | null>;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  clearNotification: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function responseCode(data: unknown): unknown {
  if (!data || typeof data !== "object") return undefined;
  const body = data as Record<string, unknown>;
  const nested = body.data && typeof body.data === "object"
    ? body.data as Record<string, unknown>
    : undefined;
  return body.code ?? body.error ?? nested?.code ?? nested?.error ?? body.message ?? nested?.message;
}

function isAdminPath(path: string) {
  return path === "/admin" || path.startsWith("/admin/");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [notification, setNotification] = useState<string | null>(null);
  const [checkedPath, setCheckedPath] = useState<string | null>(null);
  const userRef = useRef<AuthUser | null>(null);
  const requestId = useRef(0);

  const updateAuth = useCallback((nextStatus: AuthStatus, nextUser: AuthUser | null) => {
    userRef.current = nextUser;
    setUser(nextUser);
    setStatus(nextStatus);
  }, []);

  const refresh = useCallback(async (): Promise<AuthUser | null> => {
    const id = ++requestId.current;
    setStatus("loading");
    try {
      const response = await AuthService.getMe();
      if (id !== requestId.current) return userRef.current;
      const nextUser = extractAuthUser(response.data);
      if (!nextUser) {
        updateAuth("guest", null);
        return null;
      }
      updateAuth("ready", nextUser);
      setNotification(null);
      return nextUser;
    } catch (error) {
      if (id !== requestId.current) return userRef.current;
      const statusCode = axios.isAxiosError(error) ? error.response?.status : undefined;
      const code = axios.isAxiosError(error) ? responseCode(error.response?.data) : undefined;

      if (statusCode === 401) {
        updateAuth("guest", null);
        return null;
      }
      if (statusCode === 403 && code === "ACCOUNT_DEACTIVATED") {
        updateAuth("deactivated", null);
        return null;
      }

      updateAuth("error", userRef.current);
      setNotification("Bağlantı xətası");
      return userRef.current;
    }
  }, [updateAuth]);

  const login = useCallback(async (payload: LoginPayload): Promise<AuthUser> => {
    const response = await AuthService.login(payload);
    const loggedInUser = extractAuthUser(response.data);
    if (loggedInUser) {
      updateAuth("ready", loggedInUser);
      setNotification(null);
      return loggedInUser;
    }

    const currentUser = await refresh();
    if (!currentUser) throw new Error("Giriş cavabında istifadəçi məlumatı tapılmadı.");
    return currentUser;
  }, [refresh, updateAuth]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) throw error;
    }
    ++requestId.current;
    updateAuth("guest", null);
    setNotification(null);
  }, [updateAuth]);

  const clearNotification = useCallback(() => setNotification(null), []);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      void refresh().finally(() => {
        if (active) setCheckedPath(pathname);
      });
    });

    const handleFocus = () => {
      void refresh();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      active = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, [pathname, refresh]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (!axios.isAxiosError(error) || !isAdminPath(pathname) || pathname === "/admin/login") {
          return Promise.reject(error);
        }

        const statusCode = error.response?.status;
        const code = responseCode(error.response?.data);
        const next = `${window.location.pathname}${window.location.search}`;

        if (statusCode === 401) {
          updateAuth("guest", null);
          router.replace(`/admin/login?next=${encodeURIComponent(next)}`);
        } else if (statusCode === 403 && code === "ACCOUNT_DEACTIVATED") {
          updateAuth("deactivated", null);
          router.replace("/admin/login?reason=deactivated");
        } else if (statusCode === 403 && code === "FORBIDDEN") {
          setNotification("Bu əməliyyat üçün icazəniz yoxdur");
        } else if (!error.response || (statusCode !== undefined && statusCode >= 500)) {
          setNotification("Bağlantı xətası");
        }

        return Promise.reject(error);
      },
    );
    return () => api.interceptors.response.eject(interceptorId);
  }, [pathname, router, updateAuth]);

  const value: AuthContextValue = {
    user,
    status,
    pathReady: checkedPath === pathname,
    notification,
    refresh,
    login,
    logout,
    clearNotification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
