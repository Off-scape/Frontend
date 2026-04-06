
"use client"

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    title: "Tur haradan başlayır və bitir?",
    content:
      "Turun başlanğıcı əvvəlcədən müəyyən edilmiş məkandan başlayır və turun sonunda ya həmin məkan, ya da əvvəlcədən razılaşdırılmış başqa bir yerə çatır. Beləliklə, iştirakçılar marşrut boyunca haradan start götürəcəyini və harada bitəcəyini əvvəlcədən bilirlər.",
  },
  {
    title: "Hansı avadanlıqlar gətirməliyəm?",
    content: "Rahat geyim, su, gün eynəyi və şəxsi əşyalarınızı gətirməyiniz tövsiyə olunur.",
  },
  {
    title: "Yaş məhdudiyyəti varmı?",
    content: "Bəzi turlar üçün yaş məhdudiyyəti ola bilər, bu turdan asılıdır.",
  },
  {
    title: "Turun çətinlik səviyyəsi necədir?",
    content: "Turun çətinliyi orta səviyyədədir və əksər insanlar üçün uyğundur.",
  },
  {
    title: "Hansı hava şəraitində tur keçir?",
    content: "Əksər hallarda tur hər hava şəraitində keçirilir.",
  },
  {
    title: "Qidalanma və içki təmin edilir?",
    content: "Bəzi turlarda qida və içki təmin olunur.",
  },
  {
    title: "Rezervasiya necə edilir?",
    content: "Sayt üzərindən və ya əlaqə nömrəsi ilə rezervasiya edə bilərsiniz.",
  },
  {
    title: "Ev heyvanları ilə gələ bilərəm?",
    content: "Bəzi turlarda icazə verilir, əvvəlcədən dəqiqləşdirin.",
  },
  {
    title: "Tur rəhbərləri təcrübəlidirmi?",
    content: "Bəli, bütün rəhbərlər peşəkar və təcrübəlidir.",
  },
  {
    title: "Tur müddəti nə qədərdir?",
    content: "Tur müddəti əlavə məlumat verilmədikdə 1 gün ərzində keçirilir.",
  },
];

const HelpCenterPage = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) 
        : [...prev, index] 
    );
  };

  return (
    <div>
      <div className='border-b border-[#000000] pb-3 mb-11'>
        <h2 className='text-[40px] text-[#142A12] tracking-[2%] font-bold mb-5'>
          Yardım Mərkəzi
        </h2>
        <p className='text-[#142A12] text-lg tracking-[2%] font-medium'>Tez-tez verilən suallara cavab tapın və qarşılaşdığınız problemlər üçün dəstək alın.</p>
      </div>
      <ul className="w-160 ">
        {faqData.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <li
              key={index}
              className="border border-[#33443A] rounded-[40px] px-6 py-5 cursor-pointer mb-4"
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#33443A] text-lg ">{item.title}</h4>

                <FaChevronDown
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
              <p
                className={`overflow-hidden text-[#000000] text-base font-medium leading-5  transition-all duration-400
                 ${isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                {item.content}
              </p>
            </li>
          );
        })}

      </ul>
    </div>
  )
}

export default HelpCenterPage