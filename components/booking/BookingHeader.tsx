
const BookingHeader = () => {
    return (
        <>
            <div className="rounded-[10px] bg-[#142A12]  text-white px-6 py-4  flex items-center justify-between max-[685px]:flex-col max-[685px]:gap-2.5 ">

                <div >
                    <div className="text-lg font-medium mb-2   ">
                        Şuşa Təbiət Gəzintisi və Kamp Təcrübəsi
                    </div>
                    <p className="text-sm font-normal  ">
                        Təbiətin qoynunda gecələmə və paylaşım dolu anlar
                    </p>
                </div>
                <div className='px-6 py-4 max-[685px]:px-3 max-[685px]:py-2  max-[685px]:w-full  max-[685px]:text-center  bg-white rounded-[5px]  text-[#142A12] font-medium text-[17px] '>
                    Tarix və Say
                </div>
            </div>
            <div className="flex items-center mt-6 mb-6 px-4 sm:px-8 md:px-16">
                <div className="w-16 h-16 max-[430px]:w-12 max-[430px]:h-12  shrink-0 rounded-full bg-[#142A12] flex items-center justify-center text-white text-2xl     max-[430px]:text-lg  font-medium">
                    1
                </div>
                <div className="flex-1 h-[2px] bg-[#142A12]"></div>
                <div className="w-16 h-16 max-[430px]:w-12 max-[430px]:h-12 shrink-0 rounded-full bg-[#142A12] flex items-center justify-center text-white text-2xl     max-[430px]:text-lg  font-medium">
                    2
                </div>
                <div className="flex-1 h-[2px] bg-[#142A12]"></div>
                <div className="w-16 h-16 max-[430px]:w-12 max-[430px]:h-12 shrink-0 rounded-full bg-[#142A12] flex items-center justify-center text-white text-2xl     max-[430px]:text-lg  font-medium">
                    3
                </div>
            </div>
        </>
    )
}

export default BookingHeader