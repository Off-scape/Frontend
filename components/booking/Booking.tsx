
'use client'
import BookingHeader from "@/components/booking/BookingHeader"
import BookingFinish from "@/components/booking/bookingstepper/BookingFinish"
import BookingFirstStep from "@/components/booking/bookingstepper/BookingFirstStep"
import BookingSecondStep from "@/components/booking/bookingstepper/BookingSecondStep"
import BookingThreeStep from "@/components/booking/bookingstepper/BookingThreeStep"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"


const Booking = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [step, setStep] = useState(1)
  const hight = step ===4 ?"h-[calc(100vh-200px)]":"h-[calc(100vh-320px)]"

  return (
    <div className="fixed  flex flex-col items-center  w-full h-full  top-0 left-0 bg-[#00000080] z-999 p-9  max-[530px]:p-2">
      <div className="bg-white p-9 max-[685px]:p-5 max-[430px]:p-1 rounded-[10px] w-[100%]   relative">
        {
          step !== 4 && <BookingHeader step={step} />
        }

        <div className="absolute top-2 right-2 cursor-pointer">
          <IoMdClose onClick={handleCloseModal} size={24} />

        </div>

        <div className={`overflow-auto  ${hight} `}>
          {step === 1 && <BookingFirstStep setStep={setStep} />}
          {step === 2 && <BookingSecondStep setStep={setStep} />}
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