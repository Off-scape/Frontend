import { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
}
const BookingThreeStep = ({ setStep }: Props) => {
  return (
    <div className="border max-[630px]:text-center border-[#C4C4C4] rounded-[10px]  p-5   max-[430px]:p-2.5 ">
      <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
        Bron Məlumatlarının Son Təsdiqi
      </h4>
      <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
      <div className="flex max-[630px]:flex-col items-center justify-between pt-6 pb-5 border-b border-b-[#C4C4C4]">
        <p className="text-lg text-[#767676] font-medium">Turun Adı:</p>
        <p className="text-lg text-[#142A12] font-medium">
          Şuşa Təbiət Gəzintisi və Kamp Təcrübəsi
        </p>
      </div>
      <div className="flex max-[630px]:flex-col items-center justify-between pt-6 pb-5 border-b border-b-[#C4C4C4]">
        <p className="text-lg text-[#767676] font-medium">Tarix Aralığı:</p>
        <p className="text-lg text-[#142A12] font-medium">
          15 Yanvar 2027 – 17 Yanvar 2027
        </p>
      </div>
      <div className="flex max-[630px]:flex-col items-center justify-between pt-6 pb-5 border-b border-b-[#C4C4C4]">
        <p className="text-lg text-[#767676] font-medium">İştirakçılar:</p>
        <p className="text-lg text-[#142A12] font-medium">
          2 Böyük × 120 AZN = 240 AZN 1 Uşaq × 60 AZN = 60 AZN
        </p>
      </div>
      <div className="flex max-[630px]:flex-col items-center justify-between pt-6 pb-5 border-b border-b-[#C4C4C4]">
        <p className="text-lg text-[#767676] font-medium">Seçilmiş Ödəniş Kartı:</p>
        <p className="text-lg text-[#142A12] font-medium">
          Visa Personal (Son 4 rəqəm: 4821)
        </p>
      </div>
      <div className="flex max-[630px]:flex-col items-center justify-between my-6">
        <p className="text-[#0B3E35] text-[25px] font-medium">Ümumi Yekun Məbləğ:</p>
        <p className="text-[#142A12] text-2xl font-medium">
          300 AZN
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button 
        onClick={()=>setStep(4)}
        className=" bg-[#142A12] max-[630px]:px-12 max-[630px]:text-sm text-white rounded-[5px] cursor-pointer py-3.5  px-33.5 text-lg font-medium">
          Ödə və Bronu Təsdiqlə (300 AZN)
        </button>
      </div>
    </div>
  )
}

export default BookingThreeStep