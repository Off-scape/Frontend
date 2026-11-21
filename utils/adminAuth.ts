import axios from "axios";
import type { AuthRole, AuthUser } from "@/services/auth.service";
import { getErrorMessage } from "@/services/api";

export function extractAuthUser(payload: unknown): AuthUser | null {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  const data = root.data && typeof root.data === "object"
    ? root.data as Record<string, unknown>
    : root;
  const user = data.user && typeof data.user === "object"
    ? data.user as Record<string, unknown>
    : data;
  const validRoles: AuthRole[] = ["user", "superAdmin", "admin", "tourOwner", "guide"];
  if (typeof user.role !== "string" || !validRoles.includes(user.role as AuthRole)) return null;

  return {
    id: typeof user.id === "string" || typeof user.id === "number" ? user.id : undefined,
    name: typeof user.name === "string" ? user.name : undefined,
    firstName: typeof user.firstName === "string" ? user.firstName : undefined,
    lastName: typeof user.lastName === "string" ? user.lastName : undefined,
    surname: typeof user.surname === "string" ? user.surname : undefined,
    email: typeof user.email === "string" ? user.email : "",
    role: user.role as AuthRole,
    permissions: Array.isArray(user.permissions)
      ? user.permissions.filter((permission): permission is string => typeof permission === "string")
      : [],
  };
}

export function getAdminLoginError(error: unknown): { message: string; retryAfterSeconds?: number } {
  if (!axios.isAxiosError(error)) return { message: getErrorMessage(error) };

  const status = error.response?.status;
  const body = error.response?.data as {
    code?: unknown;
    error?: unknown;
    message?: unknown;
    data?: { code?: unknown; error?: unknown; message?: unknown };
  } | undefined;
  if (status === 401) return { message: "Email və ya şifrə yanlışdır" };

  const errorCode = body?.code ?? body?.data?.code ?? body?.error ?? body?.data?.error ?? body?.message ?? body?.data?.message;
  if (status === 403 && errorCode === "ACCOUNT_DEACTIVATED") {
    return { message: "Hesabınız deaktiv edilib" };
  }

  if (status === 429) {
    const rawRetryAfter = error.response?.headers?.["retry-after"];
    const secondsFromHeader = Number(rawRetryAfter);
    const retryDate = typeof rawRetryAfter === "string" ? Date.parse(rawRetryAfter) : Number.NaN;
    const retryAfterSeconds = rawRetryAfter !== undefined && Number.isFinite(secondsFromHeader) && secondsFromHeader >= 0
      ? Math.ceil(secondsFromHeader)
      : Number.isFinite(retryDate)
        ? Math.max(1, Math.ceil((retryDate - Date.now()) / 1000))
        : 60;
    return { message: "Çox sayda giriş cəhdi edildi. Bir az sonra yenidən yoxlayın.", retryAfterSeconds };
  }

  return { message: getErrorMessage(error) };
}
