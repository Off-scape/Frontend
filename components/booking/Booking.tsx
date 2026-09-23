
'use client'
import BookingHeader from "@/components/booking/BookingHeader"
import BookingFirstStep from "@/components/booking/bookingstepper/BookingFirstStep"
import BookingSecondStep from "@/components/booking/bookingstepper/BookingSecondStep"
import BookingThreeStep from "@/components/booking/bookingstepper/BookingThreeStep"
import { useState } from "react"


const Booking = () => {
  const [step, setStep] = useState(1)

    return (
        <div className="fixed flex flex-col items-center  w-full h-full top-0 left-0 bg-[#00000080] z-999 p-9">
              <div className="bg-white p-9 rounded-[10px] max-w-269.75 "> 
            <BookingHeader />
            <div>
                {step === 1 && <BookingFirstStep />}
                {step === 2 && <BookingSecondStep />}
                {step === 3 && <BookingThreeStep />}
            </div>

              </div>
        </div>
    )
}

export default Booking