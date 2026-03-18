'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { tourFilters } from "@/data/Mocktours"
import { Roboto } from 'next/font/google';
import Image from "next/image";
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})
const TourNavigation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (value: string) => {
    if (value === "") {
      router.push("?");
    } else {
      router.push(`?type=${value}`);
    }
  };


  return (
    <ul className={`flex flex-wrap sm:flex-nowrap items-center justify-between mb-11 border-b border-[#6A6A6D] px-3 sm:px-5 ${roboto.className}`}>
      {tourFilters.map((filter, id) => (
        <li
          key={id}
          onClick={() => handleClick(filter.value)}
          className={`
        flex flex-col items-center justify-center gap-2 sm:gap-3.5
        pb-4 sm:pb-5 cursor-pointer text-center
        px-2 sm:px-3  max-sm:mb-4
        text-sm sm:text-lg transition-all duration-300
        hover:border-b-2 hover:border-b-[#0B3E35]
        ${(searchParams.get("type") === null && filter.value === "") ||
              searchParams.get("type") === filter.value
              ? "border-[#0B3E35] border-b-2 font-bold text-[#142A12]"
              : "border-transparent border-b-2 text-[#000000] font-normal"
            }
      `}
        >
          <Image
            src={filter.icon}
            alt={filter.name}
            width={40}
            height={40}
            className="sm:w-10 sm:h-10 w-8 h-8"
          />
          <span className="truncate max-w-[80px] sm:max-w-none">{filter.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default TourNavigation
