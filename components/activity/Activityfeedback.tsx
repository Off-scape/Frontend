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
    <div className="mt-8 rounded-2xl   p-5 ">
      <h3 className="mb-3 text-base font-semibold text-zinc-900">
        Fikrini bölüş, birlikdə inkişaf edək
      </h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Kampa getdim, çox xoşuma gəldi. Təşkilatçılıq yüksək səviyyədə idi, hər şey düşünülmüşdü. Gözəl təcrübə üçün təşəkkür edirəm!"
        className="w-full max-w-[416px] h-[249px] resize-none rounded-xl border border-zinc-200 p-3 text-sm text-zinc-700 outline-none transition placeholder:text-zinc-400 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-[8px] flex h-[52px] w-[169px] items-center justify-center rounded-[18px] bg-[#0F766E] px-[56px] py-[10px] text-sm font-semibold text-white transition hover:bg-[#0d6560] disabled:opacity-50"
        disabled={!value.trim()}
      >
        Göndər
      </button>
    </div>
  );
};

export default ActivityFeedback;