import ComuntyCard from "@/components/community/ComuntyCard"
import ComunutyHeader from "@/components/community/ComunutyHeader"
import { community } from "@/data/Community"
const Community = () => {
    return (
        <section className="max-[1285px]:px-5">
            <ComunutyHeader />
            <div className="grid grid-cols-3 max-[1024px]:grid-cols-2 max-md:grid-cols-1 gap-8 mb-32">
            {
                community.map((item)=>(
                    <ComuntyCard key={item.id} item={item}/>
                ))
            }

            </div>
        </section>
    )
}

export default Community