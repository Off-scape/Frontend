
const BookingModal = ({}) => {
    return (
        <div className="fixed w-full h-full  flex items-center justify-center  top-0 left-0 ">
            <div className="absolute w-full h-full bg-opacity-50 backdrop-blur-sm" />
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md z-10 flex items-center  flex-col gap-5 justify-center">
            <div>
                <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7374 15.5923V24.259M23.7374 32.9256H23.7591M20.7373 4.52436L2.91669 35.3054C1.92825 37.0127 1.43403 37.8663 1.50707 38.567C1.57079 39.1781 1.89095 39.7334 2.3879 40.0947C2.95764 40.509 3.94404 40.509 5.91684 40.509H41.558C43.5308 40.509 44.5172 40.509 45.087 40.0947C45.5839 39.7334 45.9041 39.1781 45.9678 38.567C46.0408 37.8663 45.5466 37.0127 44.5582 35.3054L26.7376 4.52436C25.7527 2.82317 25.2602 1.97258 24.6177 1.6869C24.0573 1.4377 23.4175 1.4377 22.8571 1.6869C22.2146 1.97258 21.7222 2.82317 20.7373 4.52436Z" stroke="#FF0004" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>
            <div>
                Turu bron etmək üçün qeydiyyatdan keçməlisiniz !
            </div>
            <p className = " text-center ">
                Bu, Sizin üçün tur təfərrüatlarını saxlamağa və bronlaşdırmanı tamalamağa imkan verəcək.
            </p>
            <div>
                <button>
                    Qeydiyyatdan keç
                </button>
                <button>
                    Giriş et
                </button>
            </div>

            </div>
        </div>
    )
}

export default BookingModal
