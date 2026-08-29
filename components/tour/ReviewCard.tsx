import { Review } from "@/types/Review";
import Avatar from "@/ui/shared/Avatar";
import RatingStars from "@/ui/shared/RatingStars";
import { formatDate } from "@/utils/formatDate";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex gap-4 last:pb-0">
      {/* User Avatar */}
      {/* <Avatar name={review.} size="md" /> */}

      {/* Review Content */}
      <div className="flex-1">
        {/* User Name and Date */}
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-sm text-zinc-900">
            {/* {review.userName} */}
          </h4>
          <span className="text-xs text-zinc-500">{formatDate(review.createdAt)}</span>
        </div>

        {/* Rating Stars */}
        <div className="mb-2">
          <RatingStars value={review.rating} max={5} size="sm" readOnly />
        </div>

        {/* Comment */}
        <p className="text-sm text-zinc-700">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
