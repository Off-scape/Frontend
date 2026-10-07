"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ProfileAvatarContextValue {
  avatarUrl: string | null;
  setAvatarUrl: (avatarUrl: string | null) => void;
}

const ProfileAvatarContext = createContext<ProfileAvatarContextValue | null>(null);

export function ProfileAvatarProvider({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  return (
    <ProfileAvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </ProfileAvatarContext.Provider>
  );
}

export function useProfileAvatar() {
  const context = useContext(ProfileAvatarContext);
  if (!context) {
    throw new Error("useProfileAvatar must be used inside ProfileAvatarProvider");
  }
  return context;
}
