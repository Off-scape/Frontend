"use client";

import { formatDate } from "@/utils/formatDate";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { FaAngleDown, FaRegClock } from "react-icons/fa";

const TourCalendar = () => {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDatePicker = () => {
    if (open) {
      inputRef.current?.blur();
      setOpen(false);
    } else {
      inputRef.current?.showPicker();
      setOpen(true);
    }
  };

  const handleDateChange = (value: string) => {
    setDate(value);

    const params = new URLSearchParams(searchParams.toString());

    params.set("startDate", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div
      onClick={toggleDatePicker}
      className="w-[19rem] h-11 relative bg-[#0B3E35] rounded-xl flex items-center gap-2 text-white cursor-pointer px-6"
    >
      <FaRegClock />

      <span className="flex-1">
        {date ? formatDate(date) : "Select date"}
      </span>

      <input
        ref={inputRef}
        type="date"
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onBlur={() => setOpen(false)}
        className="w-0 h-0"
      />

      <FaAngleDown
        style={{
          rotate: open ? "180deg" : "0deg",
          transition: "100ms all",
        }}
      />
    </div>
  );
};

export default TourCalendar;