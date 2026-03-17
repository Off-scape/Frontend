import TourCalendar from "@/components/tour/TourCalendar";
import TourFilter from "@/components/tour/TourFilter";
import TourLocationIcon from "@/icons/TourLocationIcon";


const TourHeader = () => {
  return (
    <div>
      <div className="h-13 w-48 flex items-center justify-center gap-2 text-[#142A12] text-2xl font-bold bg-[#ECECEC] rounded-xl mb-14">
        <TourLocationIcon /> Tədbirlər
      </div>
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-[#142A12] text-[32px] font-bold">Yaxın vaxtda keçiriləcək turlar</h3>
        <div className="flex items-center gap-2.5">
          <TourCalendar />
          <TourFilter />
        </div>
      </div>
      
    </div>
  );
};

export default TourHeader