
"use client"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileSideBar from "@/components/profile/ProfileSideBar"
import { ProfileAvatarProvider } from "@/components/profile/ProfileAvatarContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { status, pathReady } = useAuth();

  useEffect(() => {
    if (!pathReady || (status !== "guest" && status !== "deactivated")) return;
    router.replace(status === "deactivated" ? "/login?reason=deactivated" : "/login");
  }, [pathReady, router, status]);

  if (pathReady && (status === "guest" || status === "deactivated")) return null;
  if (!pathReady || status === "loading") {
    return <main className="flex min-h-screen items-center justify-center">Yüklənir...</main>;
  }
  if (status === "error") {
    return <main className="flex min-h-screen items-center justify-center" role="alert">Bağlantı xətası</main>;
  }

  return (
    <ProfileAvatarProvider>
      <main className=" min-h-screen  ">
        <ProfileHeader setIsOpen={setIsOpen} />
        <div className="max-w-7xl mx-auto flex  lg:mt-45 mt-20  gap-8 max-[1285px]:px-5 ">
          <ProfileSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          {children}
        </div>
      </main>
    </ProfileAvatarProvider>
  );
}
