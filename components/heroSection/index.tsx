"use client";
import { CalendarIcon } from "@/icons/CalendarIcon";
import LocationIcon from "@/icons/locationIcon";
import { useState } from "react";
function HeroSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  return (
    <section
      id="hero-section"
      className="h-full min-h-[90vh] py-36 sm:py-0 bg-[url(../images/scenery.jpg)] bg-no-repeat bg-cover flex flex-col justify-center"
    >
      <div className="flex flex-col justify-center lg:justify-start gap-y-16.75 px-16.75">
        <h1 className="text-[64px] lg:text-[88px] text-center md:text-left text-[#F5F5DC] leading-[100%] tracking-[0%] max-w-200 w-full">
          Macəraya birlikdə
          <br />
          başla
        </h1>
        <div className="flex flex-col justify-center md:flex-row items-center bg-[#0B3E3566] backdrop-blur-sm rounded-3xl md:rounded-full max-w-175   w-full">
          {/* Location Input */}
          <div className="flex items-center gap-3 px-6 py-4 flex-1 w-full">
            <LocationIcon />

            <input
              type="text"
              placeholder="Hara?"
              className="bg-transparent outline-none text-[#F5F5DC] placeholder-[#F5F5DC] text-lg font-medium w-full"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="h-px w-full md:h-12 md:w-px bg-[#F5F5DC]/30"></div>

          {/* Date Picker */}
          <div className="flex items-center gap-3 px-6 py-4 flex-1 relative w-full">
            <CalendarIcon />

            {!selectedDate && (
              <span className="absolute left-13.5 text-[#F5F5DC] text-lg font-medium pointer-events-none">
                Nə Vaxt?
              </span>
            )}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent outline-none text-[#F5F5DC] text-lg font-medium w-full cursor-pointer
                scheme-dark
                [&::-webkit-datetime-edit-fields-wrapper]:opacity-0
                [&::-webkit-datetime-edit-text]:opacity-0
                [&::-webkit-datetime-edit-month-field]:opacity-0
                [&::-webkit-datetime-edit-day-field]:opacity-0
                [&::-webkit-datetime-edit-year-field]:opacity-0
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                [&::-webkit-calendar-picker-indicator]:opacity-0
                [&::-webkit-calendar-picker-indicator]:absolute
                [&::-webkit-calendar-picker-indicator]:inset-0
                [&::-webkit-calendar-picker-indicator]:w-full
                [&::-webkit-calendar-picker-indicator]:h-full
                data-[has-value=true]:[&::-webkit-datetime-edit-fields-wrapper]:opacity-100
                data-[has-value=true]:[&::-webkit-datetime-edit-text]:opacity-100
                data-[has-value=true]:[&::-webkit-datetime-edit-month-field]:opacity-100
                data-[has-value=true]:[&::-webkit-datetime-edit-day-field]:opacity-100
                data-[has-value=true]:[&::-webkit-datetime-edit-year-field]:opacity-100"
              data-has-value={selectedDate ? "true" : "false"}
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="bg-[#F5F5DC] cursor-pointer hover:bg-[#E5E5CC] transition-colors rounded-full  mx-4 mb-4 md:mx-0 md:mb-0 md:mr-2 md:shrink-0 w-10 h-10 flex justify-center items-center"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#0B3E35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
