
import { Roboto } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const ComunutyHeader = () => {
    return (
        <div className={roboto.className}>
            <div>
                <h3 className={` text-left text-[42px] max-md:text-4xl max-sm:text-3xl text-[#142A12] font-semibold max-lg:mb-8 max-md:mb-6 max-sm:mb-5 mb-10 max-xl:pl-5 `}>
                    Offscape-də dostluqlar qurulur
                </h3>
            </div>
            <p className="w-188 max-[800px]:w-[90%] font-medium text-[#33443A] mb-14">
                Burada yeni dostlar tapır, oxşar maraqları olan insanlarla tanış olur və hobbilərə vaxt ayıra bilirsən. Layihəmiz təbiətdə sakitlik, real ünsiyyət və dərin paylaşım mühiti yaradır. Bu əlaqələrin necə yarandığını bizimlə öyrən.
            </p>
        </div>
    )
}

export default ComunutyHeader
