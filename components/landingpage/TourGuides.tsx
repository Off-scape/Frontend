import Image from "next/image";
import { guides as defaultGuides } from "@/data/Guides";

type GuideItem = {
  id?: number | string;
  name?: string;
  role?: string;
  description?: string;
  image?: string;
  rating?: number;
  toursIcon?: string;
  tours?: string | number;
  jobIcon?: string;
  job?: string;
};

interface TourGuidesProps {
  guidesData?: GuideItem[];
}

const TourGuides = ({ guidesData = defaultGuides }: TourGuidesProps) => {
  return (
    <section className="min-h-screen py-16 px-5 bg-linear-to-br ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[32px] font-medium text-[#142A12] mb-5">
            Səyahətinizin Təcrübəli Rəhbərləri
          </h1>
          <p className="text-[#33443A] text-base leading-relaxed max-w-175 mx-auto">
            Sizi gizli yollar, nadir məkanlar və yerli mədəniyyətlə tanış edən,
            hər addımda səyahətinizi təhlükəsiz və rahat edən təcrübəli
            bələdçilərimizlə unudulmaz anlar yaşayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1312w] mx-auto">
          {guidesData.map((guide) => (
            <div
              key={guide.id ?? guide.name ?? Math.random()}
              className="bg-linear-to-br from-[#1a2921] to-[#2d3d33] rounded-[20px] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="w-48 h-48 mx-auto mb-5 relative">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                  <Image
                    src={guide.image || "/Ellipse 8 (1).png"}
                    alt={guide.name || "Guide"}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-white text-xl font-medium mb-4">
                {guide.name || "Guide"}
              </h3>

              <p className="text-[#c4c4c4] text-[13px] leading-relaxed mb-5 min-h-15">
                {guide.description || "Guide haqqında qısa məlumat."}
              </p>

              <div className="flex justify-center gap-4 mb-6 flex-wrap">
                <div className="flex gap-1">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <div className="flex flex-col items-center">
                    <span className="text-white text-sm font-medium">
                      {guide.rating ?? 5.0}
                    </span>
                    <span className="text-[#a4a4a4] text-xs ml-1">Rəyting</span>
                  </div>
                </div>

                <div className="w-px h-10 bg-white"></div>

                <div className="flex gap-1">
                  <span className="text-pink-300 text-lg">
                    {guide.toursIcon || "🧭"}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-white w-10 text-sm font-medium">
                      {guide.tours ?? "5+"}
                    </span>
                  </div>
                </div>

                <div className="w-px h-10 bg-white"></div>

                <div className="flex items-center gap-1">
                  <span className="text-purple-400 text-lg">
                    {guide.jobIcon || "💬"}
                  </span>
                  <span className="text-white text-xs">
                    {guide.job || guide.role || "Guide"}
                  </span>
                </div>
              </div>

              <button className="w-full bg-white text-black font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300">
                Daha Ətraflı
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourGuides;
