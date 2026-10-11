"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderActions from "./HeaderActions";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { RegionsService } from "@/services/regions.service";

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

const normalizeRegionItems = (data: unknown) => {
  const payload = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown })?.data)
      ? (data as { data: unknown[] }).data
      : Array.isArray((data as { results?: unknown })?.results)
        ? (data as { results: unknown[] }).results
        : Array.isArray((data as { regions?: unknown })?.regions)
          ? (data as { regions: unknown[] }).regions
          : [];

  return payload
    .map((item) => {
      const region = item as {
        id?: string | number;
        name?: string;
        title?: string;
        label?: string;
        slug?: string;
        href?: string;
      };

      const slug =
        region.slug || region.href?.split("/").filter(Boolean).at(-1) || "";
      const label = region.name || region.title || region.label || slug;

      if (!slug && !label) return null;

      return {
        label: String(label),
        href:
          region.href || `/regionlar/${String(slug ?? label).toLowerCase()}`,
      };
    })
    .filter(Boolean) as { label: string; href: string }[];
};

const HeaderNav = ({ isMobile = false, onLinkClick }: HeaderNavProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [regionlarItems, setRegionlarItems] = useState<{ label: string; href: string }[]>([]);
  const [isRegionLoading, setIsRegionLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const fetchRegions = async () => {
      setIsRegionLoading(true);

      try {
        const response = await RegionsService.getAllRegions();
        const normalized = normalizeRegionItems(response?.data ?? response);

        if (isMounted) {
          setRegionlarItems(normalized);
        }
      } catch (error) {
        console.error("Region siyahısını yükləmək mümkün olmadı:", error);
        if (isMounted) {
          setRegionlarItems([]);
        }
      } finally {
        if (isMounted) {
          setIsRegionLoading(false);
        }
      }
    };

    fetchRegions();

    return () => {
      isMounted = false;
    };
  }, []);

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
        className={` relative p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 ${isMobile ? "block" : ""}  `}
        onClick={onLinkClick}
      >
        Ana Səhifə
        {pathname === "/" && (
          <svg
            className={` absolute left-0 bottom-0 transition-all duration-300 
              ${
                pathname === "/"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              } origin-left`}
            width="90"
            height="13"
            viewBox="0 0 90 13"
            fill="none"
          >
            <line
              x1="1.00013"
              y1="11.1056"
              x2="162.685"
              y2="1.00032"
              stroke="#FFDD00"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
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
          <div className="p-3.5 text-[#F5F5DC] hover:text-amber-300 cursor-pointer transition-all duration-300">
            <div className=" flex items-center gap-x-2 relative">
              <span>Fəaliyyət</span>

              <ChevronDownIcon
                className={`transition-transform duration-300 ${openDropdown === "fealiyyet" ? "rotate-180" : ""}`}
              />
            </div>
            <svg
              className={`absolute left-0 bottom-0 transition-all duration-300 
              ${
                pathname === "/fealiyyet"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              } origin-left`}
              width="91"
              height="13"
              viewBox="0 0 91 13"
              fill="none"
            >
              <line
                x1="1.00013"
                y1="11.1056"
                x2="162.685"
                y2="1.00032"
                stroke="#FFDD00"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
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
              {isRegionLoading ? (
                <div className="p-2.5 text-sm text-white/60">
                  Regionlar yüklənir...
                </div>
              ) : (
                regionlarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2.5 text-white/80 hover:text-amber-300 transition-all duration-300 block"
                    onClick={onLinkClick}
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative group"
          onMouseEnter={() => setOpenDropdown("regionlar")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="p-3.5 text-[#F5F5DC] hover:text-amber-300 cursor-pointer transition-all duration-300 ">
            <div className=" relative flex items-center gap-x-2">
              <span>Regionlar</span>
              <ChevronDownIcon
                className={`transition-transform duration-300 ${openDropdown === "regionlar" ? "rotate-180" : ""}`}
              />
            </div>
            <svg
              className={`absolute left-0 bottom-0 transition-all duration-300 
              ${
                pathname === "/regionlar"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              } origin-left`}
              width="91"
              height="13"
              viewBox="0 0 91 13"
              fill="none"
            >
              <line
                x1="1.00013"
                y1="11.1056"
                x2="162.685"
                y2="1.00032"
                stroke="#FFDD00"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {openDropdown === "regionlar" && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#1a1a1ac1] rounded-lg shadow-lg py-6 px-8 z-50 before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-2 min-w-max">
              <div className="grid grid-cols-5 gap-x-8 gap-y-3">
                {isRegionLoading ? (
                  <div className="px-2 py-1 text-sm text-white/60">
                    Regionlar yüklənir...
                  </div>
                ) : (
                  regionlarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white px-1 py-0.5 hover:bg-black rounded-md hover:text-amber-300 transition-all duration-300 whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <Link
        href={"/about"}
        className={` relative p-3.5 text-[#F5F5DC] hover:text-amber-300 transition-all duration-300 ${isMobile ? "block" : ""}`}
        onClick={onLinkClick}
      >
        Haqqında
        <svg
          className={` absolute left-0 bottom-0 transition-all duration-300 
              ${
                pathname === "/about"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              } origin-left`}
          width="91"
          height="13"
          viewBox="0 0 91 13"
          fill="none"
        >
          <line
            x1="1.00013"
            y1="11.1056"
            x2="162.685"
            y2="1.00032"
            stroke="#FFDD00"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <HeaderActions isMobile={isMobile} />
    </nav>
  );
};

export default HeaderNav;
