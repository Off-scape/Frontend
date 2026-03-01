import MoreInfo from "@/components/landingpage/MoreInfo";
import PopularCategories from "@/components/landingpage/PopularCategories";
import WhyChooseUs from "@/components/landingpage/WhyChooseUs";
import ToursSection from "@/components/tourcard/ToursSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-white">
      <div className="max-w-7xl mx-auto">
      <ToursSection />
      <PopularCategories />
      <WhyChooseUs />
      <MoreInfo />

      </div>
    </div>
  );
}
