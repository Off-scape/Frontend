"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import ActivitiyIcon from '@/icons/ActivitiyIcon'
import BonusIcon from '@/icons/BonusIcon'
import InfoIcon from '@/icons/InfoIcon'
import NotificationIcon from '@/icons/NotificationIcon'
import PaymentIcon from '@/icons/PaymentIcon'
import PersonIcon from '@/icons/PersonIcon'
import PrivacyIcon from '@/icons/PrivacyIcon'
import RemovePersonIcon from '@/icons/RemovePersonIcon'

const menuItems = [
  { name: "Şəxsi Məlumatlar", href: "/personal", icon: PersonIcon },
  { name: "Bonuslarım", href: "/bonus", icon: BonusIcon },
  { name: "Fəaliyyət", href: "/activity", icon: ActivitiyIcon },
  { name: "Məxfilik", href: "/privacy", icon: PrivacyIcon },
  { name: "Bildirişlər", href: "/notifications", icon: NotificationIcon },
  { name: "Yardım Mərkəzi", href: "/help-center", icon: InfoIcon },
  { name: "Ödəniş Üsulları", href: "/payment", icon: PaymentIcon },
  // { name: "Hesabı Sil", href: "/#", icon: RemovePersonIcon },
]

const ProfileSideBar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-88 max-h-max bg-[#F6F7F8] py-6 px-4 rounded-xl">
      <h4 className="mb-9 text-black text-[28px] font-bold pl-2">
        Parametrlər
      </h4>

      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-5 px-3 py-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? "text-[#0B3E35] " 
                  : "text-[#828282] hover:text-[#0B3E35]"
                }`}
              >
                <item.icon />
                <p className="font-medium text-base">{item.name}</p>
              </Link>
            </li>
          )
        })}
        <li   className={`flex items-center gap-5 px-3 py-2 rounded-lg transition-all duration-300 font-medium text-base text-[#828282] hover:text-[#0B3E35] cursor-pointer`} >
            <RemovePersonIcon/>
            <p>Hesabı Sil</p>
        </li>
      </ul>
    </aside>
  )
}

export default ProfileSideBar