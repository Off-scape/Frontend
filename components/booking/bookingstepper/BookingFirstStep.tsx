import { IoCheckmark } from "react-icons/io5"

const BookingFirstStep = () => {
  return (
    <div>
      <div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5 mb-5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Mövcud Tur Tarixləri (TourDate)
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
          <div className="flex items-center justify-between mt-5 border border-[#3866FF] rounded-[10px] p-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border border-[#3866FF] flex items-center justify-center bg-[#EBF0FF]">
                  <div className="bg-[#3866FF]  w-2 h-2 rounded-full"></div>
                </div>
                <p>15 Yanvar 2027 – 17 Yanvar 2027</p>
              </div>
              <div className="flex items-center gap-2 text-[#19970D] font-medium">
                <IoCheckmark   color="#19970D" size={13} />
                12 boş yer var
              </div>
            </div>
            <div>
              <p>
                120 AZN / böyük
              </p>
              <p>
                60 AZN / uşaq
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            İştirakçı Sayı Seçimi
          </h4>
        </div>
      </div>
    </div>
  )
}

export default BookingFirstStep
