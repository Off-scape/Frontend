import { Roboto } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500","600", "700"],
});
const WhyChooseUsTitle = () => {
    return (
        <h3 className={`${roboto.className} text-center max-md:text-4xl  text-[42px] text-[#142A12] font-semibold mb-24  max-md:mb-20 `}>
            Niyə Bizi Seçməlisiniz?
        </h3>
    )
}

export default WhyChooseUsTitle
