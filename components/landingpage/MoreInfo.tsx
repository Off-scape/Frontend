import MoreInfoAccordion from "@/components/moreInfo/MoreInfoAccordion"
import MoreInfoTitle from "@/components/moreInfo/MoreInfoTitle"
import Document from '@/icons/DocumentIcon'
import Equipment from '@/icons/Equipment'
import FoodIcon from '@/icons/FoodIcon'
import LivingConditionsİcon from '@/icons/LivingConditionsİcon'
import MeetPlaceIcon from '@/icons/MeetPlaceIcon'
import NetworkIcon from '@/icons/NetworkIcon'
import SecurityIcon from '@/icons/SecurityIcon'
import ToDoIcon from '@/icons/SecurityIcon'
import { MoreInfoItem } from "@/types/MoreInfo"
const moreInfo: MoreInfoItem[] = [
    {
        title: "Sənədlər",
        icon: <Document />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Görüş yeri",
        icon: <MeetPlaceIcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Avadanlıq",
        icon: <Equipment />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Nəyə hazır olmalıyıq",
        icon: <ToDoIcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Yaşayış şərtləri",
        icon: <LivingConditionsİcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Qida qaydası",
        icon: <FoodIcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Təhlükəsizlik",
        icon: <SecurityIcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Şəbəkə",
        icon: <NetworkIcon />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
]
const MoreInfo = () => {
    return (
        <div>
            <MoreInfoTitle />

            {moreInfo.map((item, index) => (
                <MoreInfoAccordion key={index} item={item} />
            ))}

        </div>
    )
}

export default MoreInfo
