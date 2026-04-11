"use client";

import Invoices from "@/components/profile/Invoices";
import PaymentRecords from "@/components/profile/PaymentRecords";
import { useEffect, useState } from "react";

const PaymentPage = () => {
const [activeTab, setActiveTab] = useState("");

useEffect(() => {
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab) setActiveTab(savedTab);
}, []);


  const handleTabChange = (tab: string) => {
   setActiveTab(tab);
  localStorage.setItem("activeTab", tab);
  }
  return (
    <div className="w-full ">
      <div className="border-b border-black pb-3 mb-8 w-full">
        <h2 className="text-[40px] text-[#142A12] font-bold mb-5">
          Ödəniş üsulları
        </h2>
        <p className="text-[#142A12] text-lg font-medium ">
          Kredit kartlarınızı və ödəniş seçimlərinizi idarə edin.
        </p>
      </div>
      <div className="flex gap-20">
        <div className="relative cursor-pointer">
          <h4 onClick={() => handleTabChange("records")} className="text-[20px] font-bold text-[#142A12] leding-[100%] text-nowrap ">
            Ödəniş qeydləri
          </h4>
          <svg
            className={`absolute left-0 top-full mt-1 transition-all duration-300 
              ${activeTab === "records"
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
              } origin-left`}
            width="164"
            height="13"
            viewBox="0 0 164 13"
            fill="none"
          >
            <line
              x1="1.00013"
              y1="11.1056"
              x2="162.685"
              y2="1.00032"
              stroke="#FFDD00"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="relative cursor-pointer">
          <h4 onClick={() => handleTabChange("invoices")} className="text-[20px] font-bold text-[#142A12] leding-[100%] ">
            Fakturalar
          </h4>

          <svg
            className={`absolute left-0 top-full mt-1 transition-all duration-300 
              ${activeTab === "invoices"
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
              } origin-left`}
            width="91"
            height="13"
            viewBox="0 0 91 13"
            fill="none"
          >
            <line
              x1="1.00013"
              y1="11.1056"
              x2="162.685"
              y2="1.00032"
              stroke="#FFDD00"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-8">
        {activeTab === "records" ? <PaymentRecords /> : activeTab === "invoices" ? <Invoices /> : null}
      </div>
    </div>
  );
};

export default PaymentPage;