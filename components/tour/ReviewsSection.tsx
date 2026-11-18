"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ratingSummary } from "@/data/Reviews";
import type { RatingSummary, Review } from "@/types/Review";
import RatingsOverview from "./RatingsOverview";
import ReviewCard from "./ReviewCard";
import RatingStars from "@/ui/shared/RatingStars";
import { ReviewsService } from "@/services/reviews.services";
import { AuthService } from "@/services/auth.service";
import { getErrorMessage } from "@/services/api";

const DUPLICATE_REVIEW_MESSAGE = "Bu tura artıq review yazmısınız";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary] = useState<RatingSummary>(ratingSummary);
  const params = useParams<{ id: string }>();
  const tourId = Number(params.id);
  const [userId, setUserId] = useState<string | number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshReviews = useCallback(async () => {
    const response = await ReviewsService.getReview(tourId);
    const result = response.data?.data;
    setReviews(Array.isArray(result) ? result : []);
  }, [tourId]);

  useEffect(() => {
    if (!Number.isInteger(tourId) || tourId <= 0) {
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    Promise.allSettled([
      refreshReviews(),
      AuthService.getMe().then((response) => {
        const id = response.data?.user?.id;
        if (active) setUserId(id ?? null);
      }),
    ]).then(([reviewsResult]) => {
      if (!active) return;
      if (reviewsResult.status === "rejected") {
        setListError(getErrorMessage(reviewsResult.reason));
      }
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [refreshReviews, tourId]);

  const handleSubmit = async () => {
    const trimmedComment = comment.trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !trimmedComment) {
      setError("Zəhmət olmasa 1–5 ulduz seçin və şərh yazın.");
      return;
    }
    if (trimmedComment.length > 1000) {
      setError("Şərh 1000 simvoldan uzun ola bilməz.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      await ReviewsService.createReview({ tourId, rating, comment: trimmedComment });
      await refreshReviews();
      setRating(0);
      setComment("");
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message === "Xəta baş verdi. Yenidən cəhd edin." ? DUPLICATE_REVIEW_MESSAGE : message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (reviewId: number, updatedRating: number, updatedComment: string) => {
    await ReviewsService.updateReview(reviewId, {
      rating: updatedRating,
      comment: updatedComment.trim(),
    });
    await refreshReviews();
  };

  const handleDelete = async (reviewId: number) => {
    await ReviewsService.deleteReview(reviewId);
    setReviews((current) => current.filter((review) => review.id !== reviewId));
  };

  return (
    <section className="my-12">
      <h2 className="mb-8 text-2xl font-bold text-zinc-900 md:text-3xl">Şərhlər</h2>

      <RatingsOverview summary={summary} />

      <div className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-zinc-900">Şərh əlavə et</h3>
        {!userId && <p className="mb-3 text-sm text-zinc-600">Rəy yazmaq üçün hesabınıza daxil olun.</p>}
        <div className="space-y-4">
          <div>
            <p className="mb-1.5 text-sm text-zinc-600">Qiymətləndirmə</p>
            <RatingStars value={rating} max={5} size="lg" readOnly={false} onRatingChange={setRating} />
          </div>
          <textarea
            placeholder="Şərhinizi yazın..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-blue-400"
          />
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !userId}
            className="rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Göndərilir..." : "Göndər"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Yüklənir...</div>
      ) : listError ? (
        <p role="alert" className="py-8 text-center text-red-600">{listError}</p>
      ) : (
        <div className="space-y-8">
          {reviews.length ? reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwner={userId !== null && String(review.userId ?? review.user_id ?? review.user?.id) === String(userId)}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )) : <p className="py-8 text-center text-zinc-500">Hələ heç bir şərh yoxdur</p>}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
