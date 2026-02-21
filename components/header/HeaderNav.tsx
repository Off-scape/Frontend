"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderActions from "./HeaderActions";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";

interface HeaderNavProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const fealiyyetItems = [
  { label: "Camp turları", href: "/fealiyyet/camp" },
  { label: "Talim turları", href: "/fealiyyet/talim" },
  { label: "Hiking turları", href: "/fealiyyet/hiking" },
  { label: "Avto turlar", href: "/fealiyyet/avto" },
  { label: "Yoga turları", href: "/fealiyyet/yoga" },
  { label: "Eksursiyalar", href: "/fealiyyet/eksursiyalar" },
  { label: "Psixoloji sessiyalar", href: "/fealiyyet/psikho" },
];

const regionlarItems = [
  { label: "Bakı", href: "/regionlar/baki" },
  { label: "Ağdara", href: "/regionlar/agdara" },
  { label: "Xocali", href: "/regionlar/xocali" },
  { label: "Qusar", href: "/regionlar/qusar" },
  { label: "Tərtar", href: "/regionlar/tertar" },
  { label: "Gəncə", href: "/regionlar/gence" },
  { label: "Astara", href: "/regionlar/astara" },
  { label: "Xocavand", href: "/regionlar/xocavand" },
  { label: "Laçin", href: "/regionlar/lacin" },
  { label: "Yardımlı", href: "/regionlar/yardimli" },
  { label: "Sumqayıt", href: "/regionlar/sumqayit" },
  { label: "Balakan", href: "/regionlar/balakan" },
  { label: "İsmayıllı", href: "/regionlar/ismayilli" },
  { label: "Lerik", href: "/regionlar/lerik" },
  { label: "Zaqatala", href: "/regionlar/zaqatala" },
  { label: "Lənkəran", href: "/regionlar/lankaran" },
  { label: "Cəbrayıl", href: "/regionlar/cabrayil" },
  { label: "Kəlbəcər", href: "/regionlar/kalbcar" },
  { label: "Masallı", href: "/regionlar/masalli" },
  { label: "Şuşa", href: "/regionlar/susa" },
  { label: "Xankəndi", href: "/regionlar/xankandi" },
  { label: "Füzuli", href: "/regionlar/fuzuli" },
  { label: "Qax", href: "/regionlar/qax" },
  { label: "Oğuz", href: "/regionlar/oguz" },
  { label: "Qubadlı", href: "/regionlar/qubadli" },
  { label: "Şəki", href: "/regionlar/saki" },
  { label: "Gədəbəy", href: "/regionlar/gadabay" },
  { label: "Qəbələ", href: "/regionlar/qabala" },
  { label: "Siyəzən", href: "/regionlar/siyazan" },
  { label: "Xızı", href: "/regionlar/xizi" },
  { label: "Abşeron", href: "/regionlar/abseron" },
  { label: "Göygöl", href: "/regionlar/goygol" },
  { label: "Quba", href: "/regionlar/quba" },
  { label: "Şamaxı", href: "/regionlar/samahi" },
  { label: "Ağdam", href: "/regionlar/agdam" },
];

const HeaderNav = ({ isMobile = false, onLinkClick }: HeaderNavProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <nav
      className={
        isMobile
          ? "flex flex-col gap-y-2"
          : "flex items-center gap-x-4 md:gap-x-8"
      }
    >
      <Link
        href={"/"}
        className={`p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 ${isMobile ? "block" : ""}`}
        onClick={onLinkClick}
      >
        Ana Səhifə
      </Link>

      {/* Fəaliyyət - Mobile -> Accordion / Desktop -> Dropdown */}
      {isMobile ? (
        <div className="w-full">
          <button
            onClick={() => toggleAccordion("fealiyyet")}
            className="p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 flex items-center justify-between w-full"
          >
            <span>Fəaliyyət</span>
            <ChevronDownIcon
              className={`transition-transform duration-300 ${openAccordion === "fealiyyet" ? "rotate-180" : ""}`}
            />
          </button>
          {openAccordion === "fealiyyet" && (
            <div className="pl-6 flex flex-col gap-y-1 max-h-64 overflow-y-auto">
              {fealiyyetItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-2.5 text-white/80 hover:text-amber-300 transition-all duration-300 block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative group"
          onMouseEnter={() => setOpenDropdown("fealiyyet")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="p-3.5 text-[#F5F5DC] hover:text-amber-300 cursor-pointer transition-all duration-300 flex items-center gap-x-2">
            <span>Fəaliyyət</span>
            <ChevronDownIcon
              className={`transition-transform duration-300 ${openDropdown === "fealiyyet" ? "rotate-180" : ""}`}
            />
          </div>
          {openDropdown === "fealiyyet" && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#1a1a1ac1] rounded-lg shadow-lg py-6 px-8 z-50 before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-2 min-w-max">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {fealiyyetItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white hover:text-amber-300 transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Regionlar - Mobile -> Accordion / Desktop -> Dropdown */}
      {isMobile ? (
        <div className="w-full">
          <button
            onClick={() => toggleAccordion("regionlar")}
            className="p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 flex items-center justify-between w-full"
          >
            <span>Regionlar</span>
            <ChevronDownIcon
              className={`transition-transform duration-300 ${openAccordion === "regionlar" ? "rotate-180" : ""}`}
            />
          </button>
          {openAccordion === "regionlar" && (
            <div className="pl-6 flex flex-col gap-y-1 max-h-64 overflow-y-auto">
              {regionlarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-2.5 text-white/80 hover:text-amber-300 transition-all duration-300 block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative group"
          onMouseEnter={() => setOpenDropdown("regionlar")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="p-3.5 text-[#F5F5DC] hover:text-amber-300 cursor-pointer transition-all duration-300 flex items-center gap-x-2">
            <span>Regionlar</span>
            <ChevronDownIcon
              className={`transition-transform duration-300 ${openDropdown === "regionlar" ? "rotate-180" : ""}`}
            />
          </div>
          {openDropdown === "regionlar" && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#1a1a1ac1] rounded-lg shadow-lg py-6 px-8 z-50 before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-2 min-w-max">
              <div className="grid grid-cols-5 gap-x-8 gap-y-3">
                {regionlarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white px-1 py-0.5 hover:bg-black rounded-md hover:text-amber-300 transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Link
        href={"/about"}
        className={`p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 ${isMobile ? "block" : ""}`}
        onClick={onLinkClick}
      >
        Haqqında
      </Link>

      <HeaderActions isMobile={isMobile} />
    </nav>
  );
};

export default HeaderNav;
