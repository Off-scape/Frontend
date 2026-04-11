"use client";

import { useState } from "react";

const ActivityFeedback = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    // TODO: backend hazır olanda API call buraya
    console.log("Rəy göndərildi:", value);
    setValue("");
  };

  return (
    <div className="mt-8 rounded-2xl p-5">
      <h3
        className="mb-3 font-semibold text-zinc-900"
        style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
      >
        Fikrini bölüş, birlikdə inkişaf edək
      </h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Kampa getdim, çox xoşuma gəldi. Təşkilatçılıq yüksək səviyyədə idi, hər şey düşünülmüşdü. Gözəl təcrübə üçün təşəkkür edirəm!"
        className="resize-none rounded-xl border border-zinc-200 p-3 text-zinc-700 outline-none transition placeholder:text-zinc-400 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
        style={{
          width: "clamp(16rem, 50vw, 26rem)",
          height: "clamp(10rem, 25vw, 15.5625rem)",
          fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
        }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-[8px] flex items-center justify-center rounded-[18px] bg-[#0F766E] text-white font-semibold transition hover:bg-[#0d6560] disabled:opacity-50"
        disabled={!value.trim()}
        style={{
          width: "clamp(8rem, 15vw, 10.5625rem)",
          height: "clamp(2.5rem, 4vw, 3.25rem)",
          fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
          padding: "clamp(6px, 1vw, 10px) clamp(24px, 4vw, 56px)",
        }}
      >
        Göndər
      </button>
    </div>
  );
};

export default ActivityFeedback;