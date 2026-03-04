import LandscapeLeft from "@/components/landscape/LandscapeLeft"
import LandscapeRight from "@/components/landscape/LandscapeRight"

const Landscape = () => {
    return (
        <section className="max-[1285px]:px-5  grid grid-cols-2 max-md:grid-cols-1 gap-24 max-[1100px]:gap-14 max-[850px]:gap-8 max-md:gap-12 items-center justify-between mb-32 max-md:mb-20 ">
            <LandscapeLeft />
            <LandscapeRight />
        </section>
    )
}

export default Landscape
