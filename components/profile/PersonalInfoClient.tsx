"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AvatarUpload } from "./AvatarUpload";
import { BasicInfoCard } from "./Basicinfocard";
import { AccountInfoCard } from "./Accountinfocard";
import { Toast } from "./Toast";
import { Gender, ProfileUpdatePayload, UserProfile } from "@/types/Profile";
import { ProfileService } from "@/services/profile.servises";
import { api, getErrorMessage } from "@/services/api";
import { useProfileAvatar } from "./ProfileAvatarContext";

const avatarUploadApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

type ProfileRecord = Record<string, unknown>;

function unwrapProfile(value: unknown): ProfileRecord {
  let current = value;
  for (let i = 0; i < 3; i += 1) {
    if (!current || typeof current !== "object" || Array.isArray(current)) break;
    const record = current as ProfileRecord;
    const nested = record.profile ?? record.user ?? record.data;
    if (!nested || typeof nested !== "object" || Array.isArray(nested)) return record;
    current = nested;
  }
  return current && typeof current === "object" ? (current as ProfileRecord) : {};
}

function toUserProfile(value: unknown, fallback?: UserProfile): UserProfile {
  const record = unwrapProfile(value);
  const genderValue = record.gender ?? fallback?.gender;
  const gender: Gender = genderValue === "female" ? "female" : "male";
  const avatar = record.avatarUrl ?? record.avatar ?? fallback?.avatarUrl ?? null;

  return {
    id: String(record.id ?? fallback?.id ?? ""),
    firstName: String(record.firstName ?? record.name ?? fallback?.firstName ?? ""),
    lastName: String(record.lastName ?? record.surname ?? fallback?.lastName ?? ""),
    phone: String(record.phone ?? fallback?.phone ?? ""),
    email: String(record.email ?? fallback?.email ?? ""),
    gender,
    avatarUrl: typeof avatar === "string" ? avatar : null,
  };
}

export default function PersonalInfoClient() {
  const { setAvatarUrl } = useProfileAvatar();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      setToast({ msg, type });
      window.setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const response = await api.get("/api/profile");
      const profile = toUserProfile(response.data);
      setUser(profile);
      setAvatarUrl(profile.avatarUrl);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [setAvatarUrl]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const saveProfile = async (patch: ProfileUpdatePayload) => {
    if (!user) throw new Error("Profil məlumatları yüklənməyib.");
    const requestData: {
      name?: string;
      surname?: string;
      phone?: string;
      gender?: Gender;
    } = {};
    if (patch.firstName !== undefined) requestData.name = patch.firstName;
    if (patch.lastName !== undefined) requestData.surname = patch.lastName;
    if (patch.phone !== undefined) requestData.phone = patch.phone;
    if (patch.gender !== undefined) requestData.gender = patch.gender;

    const response = await ProfileService.updateProfile(requestData);
    const record = unwrapProfile(response.data);
    const hasProfileFields = ["id", "firstName", "name", "lastName", "surname", "phone", "gender", "avatarUrl"].some(
      (field) => field in record,
    );
    const updated = hasProfileFields
      ? toUserProfile(response.data, { ...user, ...patch })
      : { ...user, ...patch };
    setUser(updated);
    return updated;
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await avatarUploadApi.post("/api/profile/avatar", formData);
    const uploaded = unwrapProfile(response.data);
    if (typeof uploaded.avatarUrl === "string" || typeof uploaded.avatar === "string") {
      const profile = toUserProfile(response.data, user ?? undefined);
      setUser(profile);
      setAvatarUrl(profile.avatarUrl);
    } else {
      const profileResponse = await api.get("/api/profile");
      const profile = toUserProfile(profileResponse.data);
      setUser(profile);
      setAvatarUrl(profile.avatarUrl);
    }
  };

  const deleteAvatar = async () => {
    const response = await ProfileService.deleteProfileAvatar();
    const deletedProfile = unwrapProfile(response.data);
    const avatarUrl = typeof deletedProfile.avatar === "string"
      ? deletedProfile.avatar
      : typeof deletedProfile.avatarUrl === "string"
        ? deletedProfile.avatarUrl
        : null;
    setUser((current) => current && { ...current, avatarUrl });
    setAvatarUrl(avatarUrl);
  };

  if (loading) {
    return <div className="px-6 py-12 text-sm text-[#828282]">Profil yüklənir…</div>;
  }

  if (!user) {
    return (
      <div className="px-6 py-12" role="alert">
        <p className="text-sm text-red-700">{loadError ?? "Profil məlumatları yüklənmədi."}</p>
        <button onClick={() => void loadProfile()} className="mt-3 rounded-lg bg-[#0B3E35] px-4 py-2 text-sm text-white">
          Yenidən cəhd et
        </button>
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
        key={`${user.id}:${user.avatarUrl ?? "no-avatar"}`}
        avatarUrl={user.avatarUrl}
        userId={user.id}
        onToast={showToast}
        onUpload={uploadAvatar}
        onDelete={deleteAvatar}
      />
      <BasicInfoCard user={user} onToast={showToast} onSave={saveProfile} />
      <AccountInfoCard user={user} onToast={showToast} onChangePassword={(data) => api.patch("/api/profile/password", data)} />
    </div>
  );
}
