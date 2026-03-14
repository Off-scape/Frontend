import Document from '@/icons/DocumentIcon'
import Equipment from '@/icons/Equipment'
import FoodIcon from '@/icons/FoodIcon'
import LivingConditionsİcon from '@/icons/LivingConditionsİcon'
import MeetPlaceIcon from '@/icons/MeetPlaceIcon'
import NetworkIcon from '@/icons/NetworkIcon'
import SecurityIcon from '@/icons/SecurityIcon'
import ToDoIcon from '@/icons/SecurityIcon'
import { MoreInfoItem } from "@/types/MoreInfo"
 export const moreInfo: MoreInfoItem[] = [
    {
        title: "Sənədlər",
        icon: <Document />,
        desc: "Təqdim edilən fəliyyetlərə qatılmaq üçün etibralı şəxsiyyət vəsiqəsi tələb olunur."

    },
    {
        title: "Görüş yeri",
        icon: <MeetPlaceIcon />,
        desc: "Gəncilk metrosu, Sumqayıt dairəsi , Lökbaran dairəsi , Sulutəpə dairəsi"

    },
    {
        title: "Avadanlıq",
        icon: <Equipment />,
        desc: "Bel çantası, əsas çanta 40-50 litr, Yuxu çantası, Mövsumə uyğun dəyişik ayaqqabı (idman ayaqqabısı,sandallar və ya çəkələk), Mövsümə uyğun geyim forması, Baş fənəri + batareyalar dəsti, Gigiyena vasitələri, Günəşdən qoruyucu krem, su  qabı (1-2 l)."
    },
    {
        title: "Nəyə hazır olmalıyıq",
        icon: <ToDoIcon />,
        desc: (
            <div>
                <span className="font-bold">
                    Hazır olmalı olduğunuz:{" "}
                </span>
                Rahat geyim və ayaqqabı, kifayət qədər su, enerji verən yüngül qidalar,
                hava şəraitinə uyğun avadanlıqlar, fiziki və zehni hazırlıq.
                <br />
                <span className="font-bold">
                    Hazır olmamalı olduğunuz:{" "}
                </span>
                Qaydalara əməl etməmək, təhlükəli hərəkətlər, tullantı buraxmaq,
                təbiəti zədələmək, lazımsız əşyalar daşımaq.
            </div>
        )
    },
    {
        title: "Yaşayış şərtləri",
        icon: <LivingConditionsİcon />,
        desc: "Hər turun formatına uyğun olaraq çadırda gecələmə, hiking düşərgələri və ya kirayə evlərdə qalmatəmin edilir. Rahatlıq və təhlükəsizlik hər zaman əsas prioritetdir."

    },
    {
        title: "Qida qaydası",
        icon: <FoodIcon />,
        desc: "Hər bir turun formatına uyğun qida növləri (ana yemək, yüngül qəlyanaltı, vegan).Tədbir zamanı yüngül və enerji verən qidalar tövsiyə olunur. Şirniyyat və qazlı içkilərdən mümkün qədər uzaq durun, tullantını təbiətdə buraxma.Ətrafı təmiz saxlamaq hər kəsin öhdəliyidir."

    },
    {
        title: "Təhlükəsizlik",
        icon: <SecurityIcon />,
        desc: "Tədbir zamanı hər zaman təhlükəsizliyə diqqət yetirin. Yüksək səslə çağırış etməyin, dağlıq və ya sərt ərazilərdə ehtiyatlı olun, təlimatlara əməl edin. Zədələnmə riskini azaltmaq üçün qoruyucu avadanlıqlardan istifadə edin və bir-birinizə dəstək olun. Tur bələdçisinin qaydalarına əməl edin."

    },
    {
        title: "Şəbəkə",
        icon: <NetworkIcon />,
        desc: "Bəzi ərazilərdə mobil əlaqə zəif ola bilər. Əlaqə və koordinasiya üçün əvvəlcədən qrup mesajlaşma proqramlarından istifadə edin."

    },
]