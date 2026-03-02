import ArrowIcon from "@/icons/ArrowIcon"

const question = [
    {
        title: "Tur haradan başlayır və bitir?"
    },
    {
        title: "Qidalanma və içki təmin edilir?"
    },
    {
        title: "Hansı avadanlıqlar gətirməliyəm?"
    },
    {
        title: "Rezervasiya necə edilir?"
    },
    {
        title: "Yaş məhdudiyyəti varmı?"
    },
    {
        title: "Ev heyvanları ilə gələ bilərəm?"
    },
    {
        title: "Turun çətinlik səviyyəsi necədir?"
    },
    {
        title: "Tur rəhbərləri təcrübəlidirmi?"
    },
    {
        title: "Hansı hava şəraitində tur keçir?"
    },
    {
        title: "Tur müddəti nə qədərdir?"
    },

]
const QuestionAccordion = () => {
    return (
        <div className="grid grid-cols-2  justify-center max-[1024px]:gap-x-28  max-[850px]:gap-x-12 max-md:grid-cols-1 gap-x-64 gap-y-9 mb-32 ">
            {
                question.map((item, i) => (
                    <div
                        key={i}
                        className="group border border-[#6A6A6D] rounded-[20px] px-6 py-4 cursor-pointer 
                               flex items-center justify-between
                                hover:border-[#142A12] hover:border-2 transition-all ease-in duration-300 h-14"
                    >
                        <p className="text-[#6A6A6D] text-[18px] group-hover:text-black transition-colors ease-in duration-300">
                            {item.title}
                        </p>

                        <div className="-rotate-90 group-hover:text-[#142A12] group-hover:font-bold transition-all ease-in duration-300">
                            <ArrowIcon />
                        </div>
                    </div>
                ))

            }

        </div>
    )
}

export default QuestionAccordion