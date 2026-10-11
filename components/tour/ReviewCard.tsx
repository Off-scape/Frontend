"use client";

import { useState } from "react";
import type { Review } from "@/types/Review";
import RatingStars from "@/ui/shared/RatingStars";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/services/api";

interface ReviewCardProps {
  review: Review;
  isOwner: boolean;
  onUpdate: (id: number, rating: number, comment: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ReviewCard = ({ review, isOwner, onUpdate, onDelete }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const save = async () => {
    const trimmedComment = comment.trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !trimmedComment) {
      setError("1–5 ulduz seçin və şərhi boş saxlamayın.");
      return;
    }
    setIsPending(true);
    setError("");
    try {
      await onUpdate(review.id, rating, trimmedComment);
      setIsEditing(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsPending(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Bu rəyi silmək istədiyinizə əminsiniz?")) return;
    setIsPending(true);
    setError("");
    try {
      await onDelete(review.id);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <article className="flex gap-4 last:pb-0">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs text-zinc-500">{formatDate(review.createdAt)}</span>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <RatingStars value={rating} max={5} size="sm" readOnly={false} onRatingChange={setRating} />
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={1000}
              rows={3}
              className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-blue-400"
              aria-label="Rəy mətni"
            />
            <div className="flex gap-2">
              <button type="button" onClick={save} disabled={isPending} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setError(""); setRating(review.rating); setComment(review.comment); }} disabled={isPending} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:opacity-50">
                Ləğv et
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2">
              <RatingStars value={review.rating} max={5} size="sm" readOnly />
            </div>
            <p className="text-sm text-zinc-700">{review.comment}</p>
            {isOwner && (
              <div className="mt-3 flex gap-3">
                <button type="button" onClick={() => setIsEditing(true)} className="text-sm font-medium text-blue-700 hover:underline">Redaktə et</button>
                <button type="button" onClick={remove} disabled={isPending} className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50">Sil</button>
              </div>
            )}
          </>
        )}
        {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </article>
  );
};

export default ReviewCard;
