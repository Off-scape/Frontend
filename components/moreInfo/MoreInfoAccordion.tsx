"use client"

import { useState } from "react"
import ArrowIcon from "@/icons/ArrowIcon"
import { MoreInfoItem } from "@/types/MoreInfo"

const MoreInfoAccordion = ({ item }: { item: MoreInfoItem }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="shadow px-8 py-4 max-sm:px-6 max-sm:py-3 mb-10 rounded-[20px] border border-[rgb(11,62,53)]">

      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-8 max-md:gap-6">
          <div>{item.icon}</div>
          <h3 className="text-[22px] max-sm:text-[18px] font-bold text-[#0B3E35]">
            {item.title}
          </h3>
        </div>
        <div
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        >
          <ArrowIcon />
        </div>
      </div>
      <div
        className={`
              overflow-hidden 
              transition-all 
              duration-300 
              ease-in-out 
             text-[#000000]
             ${open ? "max-h-40 opacity-100 mt-5" : "max-h-0 opacity-0"}
               `}
      >
        <div className="border-t pl-11 max-md:pl-5 max-sm:pl-3 pt-2.5 text-[22px] max-sm:text-[18px]  font-normal max-lg:max-h-40 overflow-auto">
          <div>
            {item.desc}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreInfoAccordion