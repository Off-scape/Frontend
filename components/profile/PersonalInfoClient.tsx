"use client";

import { useCallback, useEffect, useState } from "react";
import { AvatarUpload } from "./AvatarUpload";
import { BasicInfoCard } from "./Basicinfocard";
import { AccountInfoCard } from "./Accountinfocard";
import { Toast } from "./Toast";
import { UserProfile } from "@/types/Profile";
import { AuthService } from "@/services/auth.service";

export default function PersonalInfoClient() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  useEffect(() => {
    AuthService.profile()
      .then((res) => setUser(res.data))
      .catch(() => showToast("Profil məlumatları yüklənmədi", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-[#828282]">Yüklənir...</div>
    );
  }

  if (!user) {
    return (
      <div className="w-full py-20 text-center text-[#828282]">
        Profil məlumatları tapılmadı
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 relative sm:mx-3">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div className="sm:mx-3">
        <h1 className="text-3xl sm:text-[40px] font-bold leading-tight text-[#0B3E35]">
          Şəxsi Məlumatlar
        </h1>
        <p className="text-sm text-[#142A12] mt-1">
          Şəxsi məlumatlarınız məxfidir və paylaşılmır
        </p>
      </div>

      <AvatarUpload
        avatarUrl={user.avatarUrl}
        userId={user.id}
        onToast={showToast}
      />
      <BasicInfoCard user={user} onToast={showToast} />
      <AccountInfoCard user={user} onToast={showToast} />
    </div>
  );
}
