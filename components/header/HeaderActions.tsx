'use client";'

import { GlobeIcon } from "@/icons/GlobeIcon";
import { AuthService } from "@/services/auth.service";
import { div } from "framer-motion/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

interface HeaderActionsProps {
  isMobile?: boolean;
}

const HeaderActions = ({ isMobile = false }: HeaderActionsProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await AuthService.getMe();
        if (response.data.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);
  return (
    <>
      <Link
        href={isAuthenticated ? `/personal` : `/login`}
        className={`text-black bg-[#F5F5DC] rounded-xl py-2.5 px-3 ${isMobile ? "block text-center" : ""}`}
      >
        {
          isAuthenticated ? <div> <FaRegUser size={16} />
          </div> : <div>Daxil ol</div>}

      </Link>

      {!isMobile && (
        <div className="flex gap-x-2">
          <GlobeIcon />
          <select
            className="text-[#F5F5DC] bg-transparent cursor-pointer"
            name="language"
            id="language"
          >
            <option value="az" className="text-[#F5F5DC]  ">
              Az
            </option>
          </select>
        </div>
      )}
    </>
  );
};

export default HeaderActions;
