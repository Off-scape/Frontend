import WhyChooseUsTitle from "@/components/whyChooseUs/WhyChooseUsTitle"
import kompas from '@/public/common/assets/images/kompas.svg'
import shoes from '@/public/common/assets/images/shoes.svg'
import helmet from '@/public/common/assets/images/helmet.svg'
import scales from '@/public/common/assets/images/scales.svg'
import medal from '@/public/common/assets/images/emojione_sports-medal.svg'
import WhyChooseUsCards from "@/components/whyChooseUs/WhyChooseUsCards"
import { Feature } from "@/types/Feature "
const data:Feature[] = [

    {   id:1,
        title: "Yerli ekspertiza",
        image: kompas,
        desc: "Yalnız yerli bələdçilərimizlə əldə edilə bilən gizli yolları və gizli yerləri araşdırın. Onlar sizə orijinal və unudulmaz təcrübə təqdim edirlər"
    },
    {
        id:2,
        title: "Fərdi marşrutlar",
        image: shoes,
        desc: "Qısa gəzintilərdən başlayaraq, ehtiyacınıza uyğun fərdi marşrutlar hazırlayır və hər anınızı unudulmaz edirik."
    },
    {
        id:3,
        title: "Təhlükəsizlik və etibarlılıq",
        image: helmet,
        desc: "Səyahətiniz hər detalı ilə planlanır, bələdçilərimiz sizi təhlükəsiz və etibarlı şəkildə yönləndirir."
    },
    {
        id:4,
        title: "Keyfiyyətli servis",
        image: scales,
        desc: "Sizin rahatlığınız üçün düşünülmüş xidmət. İlk əlaqədən son ana qədər etibarlı və qayğıkeş yanaşma. Standartlardan yüksək xidmət, dürüst yanaşma və davamlı dəstək."
    },
    {
        id:5,
        title: "10+ il etibarlı təcrübə",
        image: medal,
        desc: "On ildən artıq davam edən peşəkarlıq və etibarlı yol xəritəsi. Vaxtın sınağından keçmiş təcrübə, stabil və keyfiyyətli yanaşma. İllərin qazandırdığı bilik və real təcrübə ilə etibarlı xidmət təqdim edirik."
    },

]
const WhyChooseUs = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <WhyChooseUsTitle />
            <div className=" grid grid-cols-3 gap-x-8 gap-y-24 max-md:grid-cols-1 max-lg:grid-cols-2 ">

            {
                data?.map((d)=>(
                    <WhyChooseUsCards key={d.id} data={d}/>
                ))
            }
            </div>
        </section>
    )
}

export default WhyChooseUs