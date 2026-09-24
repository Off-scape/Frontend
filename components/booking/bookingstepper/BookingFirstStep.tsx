import { FaMinus } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import { IoMdAdd } from "react-icons/io"
import { IoCheckmark } from "react-icons/io5"

const BookingFirstStep = () => {
  return (
    <div className=" overflow-auto grid grid-cols-2 max-[1110px]:grid-cols-1 gap-5 h-[calc(100vh-320px)]">
      <div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5 mb-5  max-[430px]:p-2.5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Mövcud Tur Tarixləri (TourDate)
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
          <div className="flex items-center justify-between mt-5 border border-[#3866FF] rounded-[10px] p-5 max-[430px]:p-2.5 h-[60px] bg-[#EDF0FE]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full border border-[#3866FF] flex items-center justify-center bg-[#EBF0FF]">
                  <div className="bg-[#3866FF]  w-2 h-2 rounded-full"></div>
                </div>
                <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">15 Yanvar 2027 – 17 Yanvar 2027</p>
              </div>
              <div className="flex items-center gap-2 text-[#19970D] font-normal text-xs ">
                <IoCheckmark color="#19970D" size={13} />
                12 boş yer var
              </div>
            </div>
            <div>
              <p className="text-[#3866FF] text-[15px]  max-[530px]:text-xs  font-semibold ">
                120 AZN / böyük
              </p>
              <p className="text-[#142A12] text-sm font-normal ">
                60 AZN / uşaq
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5 border border-[#C4C4C4] rounded-[10px] p-5 h-[60px] max-[430px]:p-2.5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full border border-[#C4C4C4] flex items-center justify-center bg-[#EBF0FF]">
                  {/* <div className="bg-[#3866FF]  w-2 h-2 rounded-full"></div> */}
                </div>
                <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">15 Yanvar 2027 – 17 Yanvar 2027</p>
              </div>
              <div className="flex items-center gap-2 text-[#19970D] font-normal text-xs max-[530px]:text-[10px] ">
                <IoCheckmark color="#19970D" size={13} />
                12 boş yer var
              </div>
            </div>
            <div>
              <p className="text-[#3866FF] text-[15px]  max-[530px]:text-xs  font-semibold  ">
                120 AZN / böyük
              </p>
              <p className="text-[#142A12] text-sm font-normal max-[530px]:text-[10px] ">
                60 AZN / uşaq
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5 border border-[#C4C4C4] rounded-[10px] p-5 h-[60px] max-[430px]:p-2.5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full border border-[#C4C4C4] flex items-center justify-center bg-[#EBF0FF]">
                  {/* <div className="bg-[#3866FF]  w-2 h-2 rounded-full"></div> */}
                </div>
                <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">15 Yanvar 2027 – 17 Yanvar 2027</p>
              </div>
              <div className="flex items-center gap-2 text-[#FF0720] font-normal text-xs max-[530px]:text-[10px] ">
                <GrClose color="#FF0720" size={13} />
                Yerin sayı dolub (0 yer)
              </div>
            </div>
            <div>
              <p className="text-[#3866FF] text-[15px]  max-[530px]:text-xs  font-semibold ">
                120 AZN / böyük
              </p>
              <p className="text-[#142A12] text-sm font-normal max-[530px]:text-[10px] ">
                60 AZN / uşaq
              </p>
            </div>
          </div>

        </div>
        <div className="border border-[#C4C4C4] rounded-[10px] p-5">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            İştirakçı Sayı Seçimi
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
          <div className="mt-2.5 flex items-center   gap-[100px]">
            <div className=" flex flex-col items-center">
              <h4 >
                <span className="text-[#142A12] text-[17px] font-medium">Böyük Sayı</span> <span className="text-[#142A12] text-sm font-normal">(Ən azı 1 nəfər)</span>
              </h4>
              <div className="mt-1.5  flex items-center justify-center gap-2.5">
                <button className="cursor-pointer w-6 h-6 border border-[#142A12] rounded-[5px]  flex items-center justify-center">
                  <FaMinus size={13} />
                </button>
                <p>
                  1
                </p>
                <button className="cursor-pointer w-6 h-6 border border-[#142A12] rounded-[5px]  flex items-center justify-center">
                  <IoMdAdd size={13} />
                </button>
              </div>
            </div>
            <div className=" flex flex-col items-center">
              <h4 >
                <span className="text-[#142A12] text-[17px] font-medium">Uşaq Sayı</span>
              </h4>
              <div className="mt-1.5  flex items-center justify-center gap-2.5">
                <button className="cursor-pointer w-6 h-6 border border-[#142A12] rounded-[5px]  flex items-center justify-center">
                  <FaMinus size={13} />
                </button>
                <p>
                  1
                </p>
                <button className="cursor-pointer w-6 h-6 border border-[#142A12] rounded-[5px]  flex items-center justify-center">
                  <IoMdAdd size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#C4C4C4] rounded-[10px] p-5 h-fit  ">
        <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
          Canlı Qiymət Hesablanması
        </h4>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">2 × Böyük (120 AZN)</p>
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">240 AZN</p>
        </div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">1 × Uşaq (60 AZN)</p>
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">60 AZN</p>
        </div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">Xidmət haqqı</p>
          <p className="text-[15px]  max-[530px]:text-xs text-[#142A12] font-medium  ">0 AZN</p>
        </div>
        <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
        <div className="flex items-center justify-between mb-5 mt-4">
          <p className="text-[20px] text-[#142A12] font-medium  ">Cəmi Məbləğ:</p>
          <p className="text-[20px] text-[#142A12] font-medium  ">300 AZN</p>
        </div>
        <button className= " text-white bg-[#142A12] w-full py-2.5 rounded-[5px] cursor-pointer ">
          Növbəti : Ödəniş Metodu
        </button>
      </div>

    </div>
  )
}

export default BookingFirstStep
