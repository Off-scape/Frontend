
'use client'
import BookingHeader from "@/components/booking/BookingHeader"
import BookingFirstStep from "@/components/booking/bookingstepper/BookingFirstStep"
import BookingSecondStep from "@/components/booking/bookingstepper/BookingSecondStep"
import BookingThreeStep from "@/components/booking/bookingstepper/BookingThreeStep"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"


const Booking = ({ handleCloseModal }:{handleCloseModal:()=>void}) => {
  const [step, setStep] = useState(1)

  return (
    <div className="fixed  flex flex-col items-center  w-full h-full top-0 left-0 bg-[#00000080] z-999 p-9  max-[530px]:p-2">
      <div className="bg-white p-9 max-[685px]:p-5 max-[430px]:p-1 rounded-[10px] w-[100%]   relative">
          <BookingHeader />
        <div className="absolute top-2 right-2 cursor-pointer">
          <IoMdClose onClick={handleCloseModal}  size={24}/>

        </div>

        <div className="overflow-auto h-[calc(100vh-320px)]">
          {step === 1 && <BookingFirstStep />}
          {step === 2 && <BookingSecondStep />}
          {step === 3 && <BookingThreeStep />}
        </div>

      </div>
    </div>
  )
}

export default Booking