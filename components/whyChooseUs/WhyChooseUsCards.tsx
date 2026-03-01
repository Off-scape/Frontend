import { Feature } from "@/types/Feature "
import Image from "next/image"
import { Roboto , Inter } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const WhyChooseUsCards = ({ data }: { data: Feature }) => {
    return (
        <div className="border bottom-2 border-[#33443A] p-7  rounded-[40px] pr-3">
            <div className="flex items-center gap-7 mb-5 ">
                <Image
                    src={data.image}
                    alt={data.title}
                    width={54}
                    height={54}
                />
                <h4 className={`${roboto.className}  text-2xl w-full font-bold text-[#142A12]`}>
                    {data.title}
                </h4>
            </div>
            <p className={`${inter.className} ml-5 font-medium text-base leading-6`}>
                {data.desc}
            </p>
        </div>
    )
}

export default WhyChooseUsCards