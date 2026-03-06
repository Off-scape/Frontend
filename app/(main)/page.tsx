import HeroSection from "@/components/heroSection";
import Community from "@/components/landingpage/Community";
import Landscape from "@/components/landingpage/Landscape";
import MoreInfo from "@/components/landingpage/MoreInfo";
import PopularCategories from "@/components/landingpage/PopularCategories";
import Question from "@/components/landingpage/Question";
import WhyChooseUs from "@/components/landingpage/WhyChooseUs";
import ToursSection from "@/components/tourcard/ToursSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-white">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
        <ToursSection />
        <PopularCategories />
        <WhyChooseUs />
        <MoreInfo />
        <Community />
        <Question />
        <Landscape />
      </div>
    </div>
  );
}
