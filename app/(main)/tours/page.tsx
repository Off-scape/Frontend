import TourBody from "@/components/tour/TourBody";
import TourHeader from "@/components/tour/TourHeader"
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const TourPage = () => {
  return (
    <section className={`bg-zinc-50 font-sans dark:bg-white max-w-7xl mx-auto pt-36 ${roboto.className} max-sm:px-8 max-md:px-12`}>
      <TourHeader />
      <TourBody />
    </section>
  )
}

export default TourPage