import TourBody from "@/components/tour/TourBody";
import TourHeader from "@/components/tour/TourHeader";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import CardLoading from "@/ui/card/CardLoading ";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TourPage = () => {
  return (
    <section
      className={`bg-zinc-50 font-sans dark:bg-white max-w-7xl mx-auto pt-36 ${roboto.className} max-sm:px-8 max-md:px-12`}
    >
      <TourHeader />
      <Suspense
        fallback={
          <div className="sm:px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardLoading key={i} />
            ))}
          </div>
        }
      >
        <TourBody />
      </Suspense>
    </section>
  );
};

export default TourPage;