import TourCalendar from "@/components/tour/TourCalendar";
import TourFilter from "@/components/tour/TourFilter";
import TourLocationIcon from "@/icons/TourLocationIcon";


const TourHeader = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12">
      {/* Başlıq və ikon */}
      <div className="h-12 sm:h-13 w-full sm:w-48 flex items-center justify-center gap-2 text-[#142A12] text-xl sm:text-2xl font-bold bg-[#ECECEC] rounded-xl mb-8 sm:mb-14">
        <TourLocationIcon/>
        Tədbirlər
      </div>

      {/* Subtitle və Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12">
        <h3 className="text-[#142A12] text-2xl sm:text-[32px] font-bold mb-4 sm:mb-0">
          Yaxın vaxtda keçiriləcək turlar
        </h3>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap max-[1025px]:justify-end">
          <TourCalendar />
          <TourFilter />
        </div>
      </div>
    </div>
  );
};

export default TourHeader