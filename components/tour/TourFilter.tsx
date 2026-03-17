"use client"
import FilterIcon from "@/icons/FilterIcon"
import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa"

const TourFilter = () => {
    const [filter, setFilter] = useState("Filterlər")
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log(event, 'event');
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return (
        <div ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="flex items-center justify-between h-11 w-48 bg-[#F6F7F8] p-2.5 rounded-xl cursor-pointer text-[#142A12] font-medium text-lg relative">
                <FilterIcon /> {filter}<FaAngleDown style={{ "rotate": open ? "180deg" : "0deg", "animation": "ease-in-out", 'transition': " 100ms all" }} />
                <ul
                    className={`absolute left-0 bg-[#F6F7F8] w-48 max-h-max rounded-xl text-[#142A12] font-medium text-lg flex flex-col gap-2.5 items-start py-2.5 ${open ? "-bottom-33 opacity-100 pointer-events-auto" : "-bottom-37 opacity-0 pointer-events-none"}  transition-all duration-300`}
                >
                    <li className="hover:bg-[#CFE6E2] transition-all duration-300 cursor-pointer w-full text-left pl-3.5" onClick={() => setFilter("Asan")}>Asan</li>
                    <li className="hover:bg-[#CFE6E2] transition-all duration-300 cursor-pointer w-full text-left pl-3.5" onClick={() => setFilter("Orta")}>Orta</li>
                    <li className="hover:bg-[#CFE6E2] transition-all duration-300 cursor-pointer w-full text-left pl-3.5" onClick={() => setFilter("Çətin")}>Çətin</li>
                </ul>
            </button>
        </div>
    )
}

export default TourFilter
