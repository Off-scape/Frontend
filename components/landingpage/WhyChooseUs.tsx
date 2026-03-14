import WhyChooseUsTitle from "@/components/whyChooseUs/WhyChooseUsTitle"

import WhyChooseUsCards from "@/components/whyChooseUs/WhyChooseUsCards"
import { FeatureData } from "@/data/FeatureData"

const WhyChooseUs = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <WhyChooseUsTitle />
            <div className=" grid grid-cols-3 gap-x-8 gap-y-24 max-md:grid-cols-1 max-lg:grid-cols-2 ">

            {
                FeatureData?.map((data)=>(
                    <WhyChooseUsCards key={data.id} data={data}/>
                ))
            }
            </div>
        </section>
    )
}

export default WhyChooseUs