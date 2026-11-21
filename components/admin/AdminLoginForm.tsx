"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAdminLoginError } from "@/utils/adminAuth";
import { safeNext } from "@/utils/safeNext";

const STAFF_ROLES = ["superAdmin", "admin", "tourOwner", "guide"];

export default function AdminLoginForm({
  next,
  reason,
}: {
  next?: string;
  reason?: string;
}) {
  const router = useRouter();
  const { user, status, pathReady, login, notification } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCheckingSession = !pathReady || status === "loading";

  useEffect(() => {
    if (!pathReady || status !== "ready" || !user) return;
    if (user.role === "user") router.replace("/");
    else if (STAFF_ROLES.includes(user.role ?? "")) router.replace("/admin");
  }, [pathReady, router, status, user]);

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;
    const timer = window.setTimeout(() => {
      setRetryAfterSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [retryAfterSeconds]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || retryAfterSeconds > 0) return;
    setError("");
    setIsSubmitting(true);

    try {
      const loggedInUser = await login({ email: email.trim(), password });
      if (loggedInUser.role === "user") {
        router.replace("/");
        return;
      }
      if (!STAFF_ROLES.includes(loggedInUser.role ?? "")) {
        router.replace("/admin/forbidden");
        return;
      }

      router.replace(safeNext(next) ?? "/admin");
    } catch (requestError) {
      const result = getAdminLoginError(requestError);
      setError(result.message);
      setRetryAfterSeconds(result.retryAfterSeconds ?? 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F6F4] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0B3E35]">OFFscape Admin</p>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Daxil ol</h1>
        <p className="mt-2 text-sm text-gray-600">İşçi hesabınızla admin panelə daxil olun.</p>

        {(reason === "deactivated" || status === "deactivated") && (
          <p role="alert" className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-900">
            Hesabınız deaktiv edilib
          </p>
        )}
        {notification && <p role="alert" className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-900">{notification}</p>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 block h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-[#0B3E35] focus:ring-2 focus:ring-[#0B3E35]/15"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Şifrə
            <span className="relative mt-1.5 block">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block h-11 w-full rounded-lg border border-gray-300 px-3 pr-16 text-sm outline-none focus:border-[#0B3E35] focus:ring-2 focus:ring-[#0B3E35]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                className="absolute inset-y-0 right-3 text-xs font-medium text-[#0B3E35]"
              >
                {showPassword ? "Gizlət" : "Göstər"}
              </button>
            </span>
          </label>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-[#0B3E35] underline underline-offset-2">
              Şifrəni unutdum
            </Link>
          </div>

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || isCheckingSession || retryAfterSeconds > 0}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0B3E35] px-4 text-sm font-semibold text-white transition hover:bg-[#14594d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCheckingSession
              ? "Sessiya yoxlanılır..."
              : retryAfterSeconds > 0
                ? `Yenidən cəhd edin (${retryAfterSeconds}s)`
                : isSubmitting
                  ? "Daxil olunur..."
                  : "Daxil ol"}
          </button>
        </form>
      </section>
    </main>
  );
}
