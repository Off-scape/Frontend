"use client"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileSideBar from "@/components/profile/ProfileSideBar"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=" min-h-screen  ">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto flex  mt-45 gap-8 max-[1285px]:px-5 ">
      <ProfileSideBar />
      {children}
      </div>
    </main>
  )
}
