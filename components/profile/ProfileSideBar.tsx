"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ActivitiyIcon from '@/icons/ActivitiyIcon'
import InfoIcon from '@/icons/InfoIcon'
import PaymentIcon from '@/icons/PaymentIcon'
import PersonIcon from '@/icons/PersonIcon'
import PrivacyIcon from '@/icons/PrivacyIcon'
import ProfileImage from "@/public/common/assets/images/ProfileImage.svg"
import Image from "next/image"
import BonusIcon from "@/icons/BonusIcon"
import NotificationIcon from "@/icons/NotificationIcon"
const menuItems = [
  { name: "Şəxsi Məlumatlar", href: "/personal", icon: PersonIcon },
  { name: "Bonuslarım", href: "#", icon: BonusIcon },
  { name: "Fəaliyyət", href: "/activity", icon: ActivitiyIcon },
  { name: "Məxfilik", href: "/privacy", icon: PrivacyIcon },
  { name: "Bildirişlər", href: "", icon: NotificationIcon },
  { name: "Yardım Mərkəzi", href: "/help-center", icon: InfoIcon },
  { name: "Ödəniş Üsulları", href: "/payment", icon: PaymentIcon },
]

const ProfileSideBar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  const pathname = usePathname()


  return (
    <>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:hidden`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-max w-72 min-w-72 lg:w-88 bg-[#F6F7F8] py-6 px-4 rounded-none lg:rounded-xl z-50 lg:z-1  transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close button mobile */}
        <div className="flex justify-between items-center mb-6 lg:mb-9">
          <h4 className="text-black text-[24px] lg:text-[28px] font-bold pl-2">
            Parametrlər
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-xl"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-5 px-3 py-2 rounded-lg transition-all duration-300
                  ${isActive
                      ? "text-[#0B3E35]"
                      : "text-[#828282] hover:text-[#0B3E35]"
                    }`}
                >
                  {
                    item.name === "Bildirişlər" || item.name === "Bonuslarım" ? <>

                      <item.icon />

                      <div className="font-medium text-base cursor-not-allowed flex items-center  gap-2">{item.name}    <PrivacyIcon size="16"  /></div>

                    </> : <>
                      <item.icon  /> 
                      <p className="font-medium text-base">{item.name}</p></>
                  }

                </Link>
              </li>
            )
          })}

          {/* <li
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-5 px-3 py-2 rounded-lg transition-all duration-300 font-medium text-base text-[#828282] hover:text-[#0B3E35] cursor-pointer"
          >
            <RemovePersonIcon />
            <p>Hesabı Sil</p>
          </li> */}

        </ul>
        <div className=' lg:hidden items-center justify-between gap-8 flex border-t mt-6 border-[#828282] pt-6'>
          {/* <div className="cursor-pointer flex  items-center gap-1 text-[#828282] text-[16px] font-medium">
            <IoIosNotificationsOutline size={28} color="#828282" />
            Bildirişlər
          </div> */}
          <div className="cursor-pointer">
            <Image src={ProfileImage} alt="Profile Image" width={40} height={40} className="rounded-full" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default ProfileSideBar
