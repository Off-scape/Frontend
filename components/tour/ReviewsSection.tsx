"use client";

import { useEffect, useState } from "react";
import {  ratingSummary } from "@/data/Reviews";
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
  const [riviewsData, setReviewsData] = useState({
    tourId: Number(tourId),
    rating: rating,
    comment: comment
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      setError("Zəhmət olmasa şərh yazın və ulduz seçin.");
      return;
    } else {
      try {
        await ReviewsService.createReview(riviewsData);
        setError("");
      } catch (e) {
        console.error("Error creating review:", e);
        setError("Şərh yaratma xətası baş verdi. Zəhmət olmasa qeydiyyatdan keçin və ya yenidən cəhd edin.");
      }
    }

    setRating(0);
    setComment("");
  };
  useEffect(() => {
    const getReviews = async () => {
      try {

        const response = await ReviewsService.getReview(Number(tourId));
        setReviews(response.data.data);
      } catch (e) {
        console.error("Error fetching reviews:", e);
      }
    }
    getReviews()
  }, [tourId])

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
            className="rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Göndər
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
