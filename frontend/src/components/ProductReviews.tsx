import StarRating from "./StarRating";
import { useProductReviews } from "@/hooks/useProductReviews";

interface Props {
  productId: string;
}

const ProductReviews = ({ productId }: Props) => {
  const { data, isLoading } = useProductReviews(productId);

  if (isLoading) return <p>Loading reviews...</p>;

  const { reviews, averageRating, totalReviews } = data;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Reviews ({totalReviews})
      </h2>

      <div className="flex items-center gap-3 mb-6">
        <StarRating rating={Math.round(averageRating)} size={22} />
        <span className="text-gray-600">
          {averageRating.toFixed(1)} out of 5
        </span>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: any) => (
            <div key={review.id} className="border-b pb-4">
              <StarRating rating={review.rating} />
              <p className="text-sm text-gray-700 mt-2">
                {review.comment}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {review.user.firstName} {review.user.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;