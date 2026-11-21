"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthService, type AuthUser } from "@/services/auth.service";
import { extractAuthUser } from "@/utils/adminAuth";

const AdminUserContext = createContext<AuthUser | null>(null);

export function useAdminUser() {
  return useContext(AdminUserContext);
}

const ADMIN_PATH = "/admin";
const LOGIN_PATH = "/admin/login";

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === LOGIN_PATH;
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;
    let active = true;

    AuthService.getMe()
      .then(({ data }) => {
        if (!active) return;
        const currentUser = extractAuthUser(data);
        if (!currentUser) {
          const next = `${window.location.pathname}${window.location.search}`;
          router.replace(`${LOGIN_PATH}?next=${encodeURIComponent(next)}`);
          return;
        }
        if (currentUser.role === "user") {
          router.replace("/");
          return;
        }
        if (!["superAdmin", "admin", "tourOwner", "guide"].includes(currentUser.role ?? "")) {
          router.replace(`${ADMIN_PATH}/forbidden`);
          return;
        }
        setUser(currentUser);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (!active) return;
        const next = `${window.location.pathname}${window.location.search}`;
        const failure = error as { response?: { status?: number; data?: { code?: string; error?: string } } };
        const isDeactivated = failure.response?.status === 403 &&
          (failure.response.data?.code === "ACCOUNT_DEACTIVATED" || failure.response.data?.error === "ACCOUNT_DEACTIVATED");
        const reason = isDeactivated ? "&reason=deactivated" : "";
        router.replace(`${LOGIN_PATH}?next=${encodeURIComponent(next)}${reason}`);
      });

    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  if (isLoginPage) return children;
  if (isLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7F6] text-sm text-[#0B3E35]">
        Admin məlumatı yüklənir...
      </main>
    );
  }

  const links = [
    { href: ADMIN_PATH, label: "Ana səhifə" },
    { href: `${ADMIN_PATH}/account`, label: "Hesabım" },
  ];
  const displayName = user.name || [user.firstName, user.lastName || user.surname].filter(Boolean).join(" ") || user.email;

  return (
    <AdminUserContext.Provider value={user}>
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
          <div className="flex items-center gap-3 text-sm">
            <span className="max-w-[55vw] truncate">{displayName}</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900">{user.role}</span>
          </div>
        </header>
        <main className="px-4 pb-8 pt-20 md:ml-60 md:px-8">
          <div className="md:hidden mb-4 flex gap-2">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md bg-white px-3 py-2 text-sm text-[#0B3E35] shadow-sm">{item.label}</Link>
            ))}
          </div>
          {children}
        </main>
      </div>
    </AdminUserContext.Provider>
  );
}
