
"use client"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileSideBar from "@/components/profile/ProfileSideBar"
import { ProfileAvatarProvider } from "@/components/profile/ProfileAvatarContext"
import { useEffect, useState } from "react"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTokenAvailable, setIsTokenAvailable] = useState<boolean>(false);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AuthService.getMe();

        if (token.data) {
          setIsTokenAvailable(true);
          return;
        }

        router.push("/login");
      } catch (error) {
        console.error("Error fetching auth token:", error);
        router.push("/login");
      }
    };

    getAuthToken();
  }, [router]);

  if (!isTokenAvailable) {
    return null;
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
