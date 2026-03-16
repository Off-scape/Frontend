"use client"

import TourLocationIcon from "@/icons/TourLocationIcon";
import { formatDate } from "@/utils/formatDate";
import { useRef, useState } from "react";
import { FaAngleDown, FaRegClock } from "react-icons/fa";

const TourHeader = () => {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDatePicker = () => {
    if (open) {
      inputRef.current?.blur(); // bağlamaq üçün blur istifadə edə bilərik
      setOpen(false);
    } else {
      inputRef.current?.showPicker();
      setOpen(true);
    }
  };

  return (
    <div>
      <div className="h-13 w-48 flex items-center justify-center gap-2 text-[#142A12] text-2xl font-bold bg-[#ECECEC] rounded-xl mb-14">
        <TourLocationIcon /> Tədbirlər
      </div>
      <div className="flex items-center justify-between mb-12">
        <h3>Yaxın vaxtda keçiriləcək turlar</h3>
        <div>
          <div
            onClick={toggleDatePicker}
            className="w-76 h-11 relative bg-[#0B3E35] rounded-xl flex items-center gap-2 text-white cursor-pointer px-6"
          >
            <FaRegClock width={2} />
            <span className="flex-1">{formatDate(date)}</span>
            <input
              ref={inputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onBlur={() => setOpen(false)} // input blur olunca toggle-i resetlə
              className="w-0 h-0 mt-5 text-lg font-medium text-[#FFFFFF]"
            />
            <FaAngleDown style={{"rotate":open?"180deg":"0deg", "animation":"ease-in-out",'transition':" 100ms all"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeader