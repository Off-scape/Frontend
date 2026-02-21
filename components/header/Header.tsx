"use client";

import { useState, useRef, useEffect } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import { HamburgerIcon } from "@/icons/HamburgerIcon";
import { CloseIcon } from "@/icons/CloseIcon";
import { GlobeIcon } from "@/icons/GlobeIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="w-[98%] mx-auto mt-4 rounded-[20px] lg:rounded-[40px] py-3.5 px-6 bg-[#0B3E35B2]"
    >
      <div className="flex items-center justify-between roboto-medium">
        <HeaderLogo />

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <HeaderNav />
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-x-4">
          <div className="flex gap-x-2">
            <GlobeIcon />
            <select
              className="text-white bg-transparent"
              name="language"
              id="language"
            >
              <option value="az" className="text-black">
                Az
              </option>
            </select>
          </div>

          <button
            onClick={toggleMenu}
            className="text-white p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4">
          <HeaderNav isMobile onLinkClick={onLinkClick} />
        </div>
      )}
    </header>
  );
};

export default Header;
