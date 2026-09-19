import { useRouter } from "next/navigation";

const BookingModal = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
    const navigate = useRouter();
    return (
        <div className="fixed w-full h-full  flex items-center justify-center  top-0 left-0 ">
            <div className="absolute w-full h-full bg-opacity-50 backdrop-blur-sm" onClick={handleCloseModal} />
            <div className="bg-white rounded-lg shadow-lg p-6  z-10 flex items-center  flex-col gap-5 justify-center max-w-[561px]">
                <div>
                    <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.7374 15.5923V24.259M23.7374 32.9256H23.7591M20.7373 4.52436L2.91669 35.3054C1.92825 37.0127 1.43403 37.8663 1.50707 38.567C1.57079 39.1781 1.89095 39.7334 2.3879 40.0947C2.95764 40.509 3.94404 40.509 5.91684 40.509H41.558C43.5308 40.509 44.5172 40.509 45.087 40.0947C45.5839 39.7334 45.9041 39.1781 45.9678 38.567C46.0408 37.8663 45.5466 37.0127 44.5582 35.3054L26.7376 4.52436C25.7527 2.82317 25.2602 1.97258 24.6177 1.6869C24.0573 1.4377 23.4175 1.4377 22.8571 1.6869C22.2146 1.97258 21.7222 2.82317 20.7373 4.52436Z" stroke="#FF0004" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <div className="font-medium text-[20px] leading-none tracking-normal text-[#FF0000] text-center">
                    Turu bron etmək üçün qeydiyyatdan keçməlisiniz !
                </div>
                <p className="  font-medium text-[20px] leading-none tracking-normal text-center text-[#6A6A6D]">
                    Bu, Sizin üçün tur təfərrüatlarını saxlamağa və bronlaşdırmanı tamalamağa imkan verəcək.
                </p>
                <div className="flex flex-col">
                    <button
                     onClick={() => navigate.push("/register")}
                    className="bg-[#142A12] rounded-xl  text-white  px-[104.5px] py-2.5 cursor-pointer mb-6">
                        Qeydiyyatdan keç
                    </button>
                    <button 
                      onClick={() => navigate.push("/login")}
                      className="border border-[#142A12] rounded-xl font-medium text-[#333333]  px-[104.5px] py-2.5 cursor-pointer">
                        Giriş et
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BookingModal
