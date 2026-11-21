"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const ADMIN_PATH = "/admin";
const LOGIN_PATH = "/admin/login";
const UNPROTECTED_PATHS = new Set([LOGIN_PATH, "/admin/forgot-password"]);

const ROLE_LABELS: Record<string, string> = {
  superAdmin: "Super admin",
  admin: "Admin",
  tourOwner: "Tərəfdaş",
  guide: "Bələdçi",
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ADMIN_PATH;
  const router = useRouter();
  const { user, status, pathReady, notification, refresh, logout, clearNotification } = useAuth();
  const isUnprotectedPage = UNPROTECTED_PATHS.has(pathname);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    if (isUnprotectedPage || !pathReady) return;

    if (status === "guest") {
      const next = `${window.location.pathname}${window.location.search}`;
      router.replace(`${LOGIN_PATH}?next=${encodeURIComponent(next)}`);
    } else if (status === "deactivated") {
      router.replace(`${LOGIN_PATH}?reason=deactivated`);
    } else if (status === "ready" && user?.role === "user") {
      router.replace("/");
    }
  }, [isUnprotectedPage, pathReady, router, status, user]);

  if (isUnprotectedPage) return children;

  if (!pathReady || status === "loading" || status === "guest" || status === "deactivated") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7F6] text-[#0B3E35]" aria-live="polite">
        <span className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-[#0B3E35]" aria-label="Yüklənir" />
      </main>
    );
  }

  if (status === "error" && !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F7F6] px-4 text-[#0B3E35]">
        <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">Bağlantı xətası</p>
        <button type="button" onClick={() => void refresh()} className="rounded-lg bg-[#0B3E35] px-4 py-2 text-sm font-semibold text-white">Yenidən yoxla</button>
      </main>
    );
  }

  if (!user || user.role === "user") return null;

  const links = [
    { href: ADMIN_PATH, label: "Ana səhifə" },
    { href: `${ADMIN_PATH}/account`, label: "Hesabım" },
  ];
  const displayName = user.name || [user.firstName, user.lastName || user.surname].filter(Boolean).join(" ") || user.email;
  const roleLabel = ROLE_LABELS[user.role ?? ""] || "İşçi";

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logout();
      router.replace(LOGIN_PATH);
    } catch {
      setLogoutError("Bağlantı xətası");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#142A24]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-gray-200 bg-white md:block">
        <div className="border-b border-gray-100 px-6 py-5 text-lg font-bold text-[#0B3E35]">OFFscape Admin</div>
        <nav aria-label="Admin menyusu" className="p-3">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`mb-1 block rounded-lg px-3 py-2.5 text-sm ${active ? "bg-emerald-50 font-semibold text-emerald-900" : "text-gray-700 hover:bg-gray-50"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:left-60 md:px-8">
        <Link href={ADMIN_PATH} className="font-semibold text-[#0B3E35] md:hidden">OFFscape Admin</Link>
        <div className="hidden md:block" />
        <div className="flex items-center gap-1.5 text-xs sm:gap-4 sm:text-sm">
          <span className="max-w-[18vw] truncate sm:max-w-[25vw]">{displayName}</span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900 sm:px-2.5 sm:text-xs">{roleLabel}</span>
          <Link href="/" className="whitespace-nowrap text-[#0B3E35] underline underline-offset-2">Sayta keç</Link>
          <button type="button" onClick={() => void handleLogout()} className="whitespace-nowrap rounded-md bg-[#0B3E35] px-2.5 py-2 text-[10px] font-semibold text-white sm:px-3 sm:text-xs">Çıxış</button>
        </div>
      </header>

      <main className="px-4 pb-8 pt-20 md:ml-60 md:px-8">
        <div className="mb-4 flex gap-2 md:hidden">
          {links.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`rounded-md px-3 py-2 text-sm shadow-sm ${pathname === item.href ? "bg-emerald-50 font-semibold text-emerald-900" : "bg-white text-[#0B3E35]"}`}>
              {item.label}
            </Link>
          ))}
        </div>
        {(notification || logoutError) && (
          <div role="alert" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <span>{logoutError || notification}</span>
            {notification && !logoutError && <button type="button" onClick={clearNotification} aria-label="Bildirişi bağla">×</button>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
