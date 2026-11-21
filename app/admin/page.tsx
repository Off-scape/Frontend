"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function AdminHomePage() {
  const { user } = useAuth();
  const name = user?.name || [user?.firstName, user?.lastName || user?.surname].filter(Boolean).join(" ") || user?.email || "";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-[#0B3E35]">Xoş gəldiniz, {name}</h1>
    </section>
  );
}
