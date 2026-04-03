"use client"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileSideBar from "@/components/profile/ProfileSideBar"
import { useState } from "react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <main className=" min-h-screen  ">
      <ProfileHeader setIsOpen={setIsOpen} />
      <div className="max-w-7xl mx-auto flex  lg:mt-45 mt-20  gap-8 max-[1285px]:px-5 ">
      <ProfileSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
      </div>
    </main>
  )
}
