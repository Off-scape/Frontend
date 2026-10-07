
'use client'
import BookingHeader from "@/components/booking/BookingHeader"
import BookingFinish from "@/components/booking/bookingstepper/BookingFinish"
import BookingFirstStep from "@/components/booking/bookingstepper/BookingFirstStep"
import BookingSecondStep from "@/components/booking/bookingstepper/BookingSecondStep"
import BookingThreeStep from "@/components/booking/bookingstepper/BookingThreeStep"
import { ITourDate } from "@/types/Tour"
import { Dispatch, SetStateAction, useState } from "react"
import { IoMdClose } from "react-icons/io"



type BookingProps = {
  handleCloseModal: () => void,
  tourDate: ITourDate[],
  tourTitle: string,
  tourSubtitle: string,
  setBookData: Dispatch<SetStateAction<{ tourDateId: number | null; seats: number | null; childSeats: number | null; cardId: number | null }>>,
  bookData: { tourDateId: number | null; seats: number | null; childSeats: number | null; cardId: number | null }
}

const Booking = ({ handleCloseModal, tourDate, tourTitle, tourSubtitle, setBookData, bookData }: BookingProps) => {
  const [step, setStep] = useState(1)
  const hight = step === 4 ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-320px)]"
  const chosenTourDate = tourDate.find((item) => item.id === bookData.tourDateId) ?? null
  return (
    <div className="fixed  flex flex-col items-center  w-full h-full  top-0 left-0 bg-[#00000080] z-999 p-9  max-[530px]:p-2">
      <div className="bg-white p-9 max-[685px]:p-5 max-[430px]:p-1 rounded-[10px] w-[100%]   relative">
        {
          step !== 4 && <BookingHeader step={step} tourTitle={tourTitle} tourSubtitle={tourSubtitle} />
        }

        <div className="absolute top-2 right-2 cursor-pointer">
          <IoMdClose onClick={handleCloseModal} size={24} />

        </div>

        <div className={`overflow-auto  ${hight} `}>
          {step === 1 && <BookingFirstStep setStep={setStep} tourDate={tourDate} setBookData={(data) => setBookData({ ...data, cardId: null })} />}
          {step === 2 && <BookingSecondStep setStep={setStep} chosenTourDate={chosenTourDate} bookData={bookData} setBookData={setBookData} />}
          {step === 3 && <BookingThreeStep setStep={setStep} />}
          {
            step === 4 && <BookingFinish />
          }
        </div>


      </div>
    </div>
  )
}

export default Booking