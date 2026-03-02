import LandscapeLeft from "@/components/landscape/LandscapeLeft"
import LandscapeRight from "@/components/landscape/LandscapeRight"

const Landscape = () => {
    return (
        <section className="max-[1285px]:px-5  grid grid-cols-2 gap-24 max-[1100px]:gap-14 items-center justify-between mb-32">
            <LandscapeLeft />
            <LandscapeRight />
        </section>
    )
}

export default Landscape
