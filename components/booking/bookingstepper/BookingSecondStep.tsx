
'use client'
import { CreditCardsService } from "@/services/creditcards.services";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
}
const BookingSecondStep = ({ setStep }: Props) => {
  const [expiry, setExpiry] = useState("");
  const [userCards, setUserCards] = useState()
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/\D/g, "");
    const limitedVal = inputVal.slice(0, 4);
    let formattedVal = limitedVal;
    if (limitedVal.length > 2) {
      formattedVal = `${limitedVal.slice(0, 2)}/${limitedVal.slice(2)}`;
    }

    setExpiry(formattedVal);
  };


  useEffect(() => {
    const getUserCards = async () => {
      try {
        const response = await CreditCardsService.getCards()
        setUserCards(response.data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getUserCards()
  }, [])
  return (
    <div className="grid grid-cols-2 gap-6 max-[1024px]:grid-cols-1">
      <div className="">
        <div className="border h-full border-[#C4C4C4] rounded-[10px]  p-5 mb-5  max-[430px]:p-2.5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Yeni Kart Əlavə Et
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
          <h4 className="text-[#142A12] text-[15px] font-medium mb-3 mt-6">
            Kart Sahibinin Adı və Soyadı
          </h4>
          <div className="flex items-center justify-between mt-5 border border-[#C4C4C4] rounded-[10px] p-5 h-[60px] max-[430px]:p-2.5">

            <input type="text" placeholder="Məs: ELVIN ALIYEV" className="text-ms text-[#142A12] font-normal focus:outline-none focus:border-none" />
          </div>
          <h4 className="text-[#142A12] text-[15px] font-medium mb-3 mt-6">
            Kart Nömrəsi
          </h4>
          <div className="flex items-center justify-between mt-5 border  border-[#C4C4C4] rounded-[10px] p-5 h-[60px] max-[430px]:p-2.5">

            <input type="number" className="text-ms text-[#142A12] font-normal focus:outline-none focus:border-none " placeholder="0000 0000 0000 0000" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-7 mb-7">
            {/* Expiration Date Field */}
            <div className="flex-1">
              <label htmlFor="expiry" className="block text-sm font-bold text-gray-900 mb-1">
                Bitma Ayı / İli (MM/YY)
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM / YY"
                maxLength={5} // MM/YY is 5 characters long
                inputMode="numeric" // Brings up the number pad on mobile
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-800 focus:outline-none "
              />
            </div>

            {/* CVV Field */}
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm font-bold text-gray-900 mb-1">
                CVV / CVC
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="***"
                maxLength={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-800 focus:outline-none "
              />
            </div>
          </div>
          <div>
            <input type="checkbox" id="defaultcard" />
            <label htmlFor="defaultcard" className="font-normal text-[#888888] text-[15px] inline-block ml-2.5">
              &quot;Default kart et&quot; - Növbəti ödənişlər üçün saxlanılsın
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5 mb-5  max-[430px]:p-2.5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Saxlanılmış Kartların Siyahısı
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4] mb-3" />
          <div className="flex flex-col gap-2">
            <div className="bg-[#EBF0FF] border border-[#3866FF] p-3  rounded-[5px] flex items-center justify-between ">
              <div className="flex items-center ">
                <div className="w-4 h-4 rounded-full border border-[#3866FF]  flex items-center justify-center mr-5">
                  <div className="w-2 h-2 bg-[#3866FF] rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="py-2 px-2.5 bg-[#06174F] rounded-[5px] text-white  font-medium text-xs w-fit mr-5">
                    VISA
                  </div>
                  <div>
                    <p className="text-[#142A12] text-[15px] font-medium ">Visa Personal **** 4821</p>
                    <p className="text-[#142A12] text-xs font-normal ">
                      Bitmə tarixi: 08/28
                    </p>
                  </div>
                </div>

              </div>
              <div>
                <button className="text-[#0327A0] bg-[#C3D1F8] cursor-pointer rounded-[5px] py-2 px-4 text-xs font-normal">
                  Default Kart
                </button>
              </div>
            </div>
            <div className="bg-[#EBF0FF] border border-[#C4C4C4] p-3  rounded-[5px] flex items-center justify-between ">
              <div className="flex items-center ">
                <div className="w-4 h-4 rounded-full border border-[#C4C4C4]  flex items-center justify-center mr-5">
                  {/* <div className="w-2 h-2 bg-[#3866FF] rounded-full"></div> */}
                </div>
                <div className="flex items-center">
                  <div className="py-2 px-2.5 bg-[#D9081D] rounded-[5px] text-white  font-medium text-xs w-fit mr-5">
                    MC
                  </div>
                  <div>
                    <p className="text-[#142A12] text-[15px] font-medium ">Mastercard Business **** 9012</p>
                    <p className="text-[#142A12] text-xs font-normal ">
                      Bitmə tarixi: 11/26
                    </p>
                  </div>
                </div>

              </div>
              {/* <div>
                <button className="text-[#0327A0] bg-[#C3D1F8] cursor-pointer rounded-[5px] py-2 px-4 text-xs font-normal">
                  Default Kart
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5   max-[430px]:p-2.5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-2.5">
            Seçim Xülasəsi
          </h4>
          <div>
            <h4 className="text-[#142A12] text-[15px] font-medium">
              15 Yanvar – 17 Yanvar 2027
            </h4>
            <p className="text-[#7D7D7D] text-xs font-normal">
              2 Böyük, 1 Uşaq
            </p>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[15px] text-[#7D7D7D] font-medium ">
                Tur qiyməti
              </p>
              <p className="tetx-[#142A12] font-medium text-[15px]">
                300 AZN
              </p>
            </div>
            <div className="w-full h-[1px] bg-[#C4C4C4]" />
            <div className="flex items-center justify-between mb-4 mt-3">
              <p className="text-[20px] text-[#142A12] font-medium ">
                Ödəniləcək:
              </p>
              <p className="tetx-[#142A12] font-medium text-[20px]">
                300 AZN
              </p>
            </div>
          </div>
          <button
            onClick={() => setStep(3)}

            className=" text-white bg-[#142A12] w-full py-2.5 rounded-[5px] cursor-pointer ">
            Növbəti: Təsdiqləmə
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSecondStep
