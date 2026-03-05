import { Roboto } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const MoreInfoTitle = () => {
    return (
        <div>
            <h3 className={`${roboto.className} text-left text-[42px] max-lg:text-4xl max-md:text-3xl max-lg:mb-16 max-md:mb-14 max-sm:mb10 text-[#142A12] font-semibold mb-20 max-xl:pl-5 `}>
                Əlavə məlumatlar
            </h3>
        </div>
    )
}

export default MoreInfoTitle
