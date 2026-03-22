"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Ana Sehife" },
  { href: "/haqqinda", label: "Haqqında" },
  { href: "/faaliyyet", label: "Fəaliyyət" },
  { href: "/daxil-ol", label: "Daxil ol" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className="w-full relative"
        style={{
          backgroundColor: "#0B3E35",
          borderRadius: menuOpen
            ? "clamp(12px, 2vw, 25px) clamp(12px, 2vw, 25px) 0 0"
            : "clamp(12px, 2vw, 25px)",
          padding: "0 clamp(16px, 4vw, 48px)",
          height: "clamp(60px, 8vw, 88px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "border-radius 0.2s ease",
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(22px, 4vw, 40px)",
            fontWeight: "400",
            color: "#ffffff",
            letterSpacing: "-0.3px",
          }}
        >
          Grounded
        </span>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "clamp(12px, 2.5vw, 36px)" }}
        >
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative text-white font-normal no-underline transition-transform duration-200 ease-out hover:-translate-y-0.5 group"
              style={{ fontSize: "clamp(12px, 1.2vw, 15px)" }}
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#FFDD00] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left" />
            </Link>
          ))}

          <Link
            href="/qeydiyyat"
            className="border flex justify-center items-center font-medium bg-white border-white text-black rounded-[12px] no-underline whitespace-nowrap hover:text-emerald-900 transition-colors duration-200"
            style={{
              width: "clamp(120px, 12vw, 166px)",
              height: "clamp(34px, 4vw, 41px)",
              fontSize: "clamp(11px, 1.1vw, 14px)",
            }}
          >
            Qeydiyyatdan keç
          </Link>

          <div
            className="flex items-center gap-1.5 text-white font-medium cursor-pointer"
            style={{ fontSize: "clamp(11px, 1.1vw, 14px)" }}
          >
            <Image
              src="/common/assets/images/tours/globe-02.svg"
              alt="Az"
              width={20}
              height={20}
            />
            <span>Az</span>
          </div>
        </div>

        {/* Mobile right: lang + burger */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-1.5 text-white text-sm font-medium cursor-pointer">
            <Image
              src="/common/assets/images/tours/globe-02.svg"
              alt="Az"
              width={18}
              height={18}
            />
            <span>Az</span>
          </div>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg focus:outline-none"
            aria-label="Menyu"
          >
            <span
              className="block bg-white rounded-full transition-all duration-300 origin-center"
              style={{
                width: 22,
                height: 2,
                transform: menuOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block bg-white rounded-full transition-all duration-300"
              style={{
                width: 22,
                height: 2,
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block bg-white rounded-full transition-all duration-300 origin-center"
              style={{
                width: 22,
                height: 2,
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: menuOpen ? "320px" : "0px",
          backgroundColor: "#0B3E35",
          borderRadius:
            "0 0 clamp(12px, 2vw, 25px) clamp(12px, 2vw, 25px)",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col px-6 pb-5 pt-2 gap-1">
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-base font-normal no-underline py-3 border-b border-white/10 last:border-0 hover:text-[#FFDD00] transition-colors duration-200"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/qeydiyyat"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex justify-center items-center font-medium bg-white text-black rounded-[12px] no-underline py-2.5 text-sm hover:text-emerald-900 transition-colors duration-200"
          >
            Qeydiyyatdan keç
          </Link>
        </div>
      </div>
    </>
  );
}