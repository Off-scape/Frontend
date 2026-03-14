import MoreInfoAccordion from "@/components/moreInfo/MoreInfoAccordion"
import MoreInfoTitle from "@/components/moreInfo/MoreInfoTitle"
import { moreInfo } from "@/data/MoreInfo"

const MoreInfo = () => {
    return (
        <section className="max-[1285px]:px-5">
            <MoreInfoTitle />
            {moreInfo.map((item, index) => (
                <MoreInfoAccordion key={index} item={item} />
            ))}
        </section>
    )
}

export default MoreInfo
