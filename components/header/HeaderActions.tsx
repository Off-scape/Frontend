import { GlobeIcon } from "@/icons/GlobeIcon";
import Link from "next/link";

interface HeaderActionsProps {
  isMobile?: boolean;
}

const HeaderActions = ({ isMobile = false }: HeaderActionsProps) => {
  return (
    <>
      <Link
        href={"/auth/login"}
        className={`text-black bg-[#F5F5DC] rounded-xl py-2.5 px-3 ${isMobile ? "block text-center" : ""}`}
      >
        Daxil ol
      </Link>

      {!isMobile && (
        <div className="flex gap-x-2">
          <GlobeIcon />
          <select
            className="text-[#F5F5DC] bg-transparent"
            name="language"
            id="language"
          >
            <option value="az" className="text-black">
              Az
            </option>
          </select>
        </div>
      )}
    </>
  );
};

export default HeaderActions;
