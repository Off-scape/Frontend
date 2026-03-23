import { mockReviews, ratingSummary } from "@/data/Reviews";
import RatingsOverview from "./RatingsOverview";
import ReviewCard from "./ReviewCard";

const ReviewsSection = () => {
  return (
    <section className="my-12">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
        Şərhlər
      </h2>

      {/* Ratings Overview */}
      <RatingsOverview summary={ratingSummary} />

      {/* Reviews List */}
      <div className="space-y-8">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
