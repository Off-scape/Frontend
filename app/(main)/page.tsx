import PopularCategories from "@/components/landingpage/PopularCategories";
import ToursSection from "@/components/tourcard/ToursSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-white">
      <ToursSection />
      <PopularCategories />
    </div>
  );
}
