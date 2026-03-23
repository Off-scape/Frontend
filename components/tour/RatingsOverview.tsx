import { RatingSummary } from "@/types/Review";
import RatingStars from "@/ui/shared/RatingStars";

interface RatingsOverviewProps {
  summary: RatingSummary;
}

const RatingsOverview = ({ summary }: RatingsOverviewProps) => {
  return (
    <div className="mb-8">
      {/* Main Rating Display */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {/* Average Rating */}
        <div className="flex flex-col items-center sm:min-w-36">
          <div className="text-4xl font-bold text-zinc-900 mb-2">
            {summary.averageRating.toFixed(1)}
          </div>
          <div className="mb-2">
            <RatingStars
              value={summary.averageRating}
              max={5}
              size="lg"
              readOnly
            />
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="w-full flex-1">
          {summary.ratingDistribution.map((item, index) => (
            <div
              key={index}
              className="mb-3 grid w-full lg:max-w-75 grid-cols-[3rem_1fr_1.5rem] items-center gap-2 sm:gap-3"
            >
              <span className="text-xs text-zinc-600 text-right sm:text-sm whitespace-nowrap">
                {item.rating} ulduz
              </span>
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs text-zinc-600 text-right sm:text-sm">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsOverview;
