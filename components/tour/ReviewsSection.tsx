"use client";

import { useEffect, useState } from "react";
import { ratingSummary } from "@/data/Reviews";
import { Review, RatingSummary } from "@/types/Review";
import RatingsOverview from "./RatingsOverview";
import ReviewCard from "./ReviewCard";
import RatingStars from "@/ui/shared/RatingStars";
import { ReviewsService } from "@/services/reviews.services";
import { useParams } from "next/navigation";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<RatingSummary>(ratingSummary);
  const { id: tourId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      setError("Zəhmət olmasa şərh yazın və ulduz seçin.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await ReviewsService.createReview({
        tourId: Number(tourId),
        rating: rating,
        comment: comment.trim()
      });

      // Refresh reviews after successful submission
      const response = await ReviewsService.getReview(Number(tourId));
      setReviews(response.data.data);
      
      // Reset form
      setRating(0);
      setComment("");
    } catch (e) {
      console.error("Error creating review:", e);
      setError("Şərh yaratma xətası baş verdi. Zəhmət olmasa qeydiyyatdan keçin və ya yenidən cəhd edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!tourId) return;

    const getReviews = async () => {
      setIsLoading(true);
      try {
        const response = await ReviewsService.getReview(Number(tourId));
        setReviews(response.data.data);
      } catch (e) {
        console.error("Error fetching reviews:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [tourId]);

  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
        Şərhlər
      </h2>

      <RatingsOverview summary={summary} />

      {/* Add Review Form */}
      <div className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-4">Şərh əlavə et</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-zinc-600 mb-1.5">Qiymətləndirmə</p>
            <RatingStars
              value={rating}
              max={5}
              size="lg"
              readOnly={false}
              onRatingChange={setRating}
            />
          </div>

          <textarea
            placeholder="Şərhinizi yazın..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-blue-400 transition resize-none"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Göndərilir...' : 'Göndər'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Yüklənir...</div>
      ) : (
        <div className="space-y-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="text-center text-zinc-500 py-8">Hələ heç bir şərh yoxdur</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;