import HeroSection from "@/components/heroSection";
import PopularCategories from "@/components/landingpage/PopularCategories";
import ToursSection from "@/components/tourcard/ToursSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-white">
      <HeroSection />
      <ToursSection />
      <PopularCategories />
    </div>
  );
}
