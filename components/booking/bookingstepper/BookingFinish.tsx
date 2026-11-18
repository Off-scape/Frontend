
const BookingFinish = () => {
    return (
        <div className="flex flex-col items-center gap-7">
            <div className="flex flex-col gap-4 items-center justify-center">
                <svg width="72" height="69" viewBox="0 0 72 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.5 69C15.4774 69 0 53.5234 0 34.5C0 15.4766 15.4775 0 34.5 0C43.0127 0 51.1904 3.12766 57.5262 8.80654C58.3143 9.51312 58.3797 10.7251 57.6722 11.5131C56.9665 12.303 55.7556 12.3666 54.9656 11.661C49.3354 6.61291 42.0674 3.8333 34.5 3.8333C17.5907 3.8333 3.8333 17.5906 3.8333 34.5C3.8333 51.4094 17.5906 65.1667 34.5 65.1667C51.0574 65.1667 64.519 52.2161 65.1442 35.6839C65.1854 34.6264 66.0614 33.7832 67.132 33.8402C68.1896 33.8805 69.015 34.7705 68.9739 35.828C68.2701 54.4294 53.1276 69 34.5 69Z" fill="#02AB47" />
                    <path d="M71.8511 19.386L66.4299 13.9648L37.2533 43.1414L16.9212 22.8095L11.5 28.2307L37.2506 53.9811L37.2533 53.9784L37.2559 53.9811L71.8511 19.386Z" fill="#02AB47" />
                </svg>
                <p className="text-3xl font-medium text-[#02AB47] text-center">
                    Ödəniş Uğurla Tamamlandı!
                </p>
            </div>
            <div className="bg-[#F1F1F1] p-7 w-[80%]  max-[500px]:w-full rounded-[5px]  ">
                <div className="flex items-center justify-between mb-3" >
                    <p className="text-sm font-normal text-[#142A12]  ">
                        Booking Nömrəsi:
                    </p>
                    <p className="text-sm font-medium text-[#142A12]">
                        #BK-982415
                    </p>
                </div>
                <div className="flex items-center justify-between mb-3" >
                    <p className="text-sm font-normal text-[#142A12]  ">
                        Status:
                    </p>
                    <p className="text-sm font-medium text-[#02AB47]">
                        Confirmed (Təsdiqləndi)
                    </p>
                </div>
                <div className="flex items-center justify-between mb-3" >
                    <p className="text-sm font-normal text-[#142A12]  ">
                        Tur 
                    </p>
                    <p className="text-sm  font-medium text-[#142A12]">
                        Şuşa Təbiət Gəzintisi və Kamp Təcrübəsi 
                    </p>
                </div>
                <div className="flex items-center justify-between mb-3" >
                    <p className="text-sm font-normal text-[#142A12]  ">
                       Tarix:
                    </p>
                    <p className="text-sm  font-medium text-[#142A12]">
                         15–17 Yan 2027
                    </p>
                </div>
                <div className="flex items-center justify-between mb-3" >
                    <p className="text-sm font-normal text-[#142A12]  ">
                        Ödənilən Cəmi:
                    </p>
                    <p className="text-sm font-medium text-[#142A12]">
                        300 AZN
                    </p>
                </div>
            </div>
            <div>
                <button className="bg-[#142A12] rounded-[5px] text-white font-medium textlg py-2.5 px-20 cursor-pointer ">
                    {'"Bronlarım" Bölməsinə Keç'}
                </button>
            </div>

        </div>
    )
}

export default BookingFinish
