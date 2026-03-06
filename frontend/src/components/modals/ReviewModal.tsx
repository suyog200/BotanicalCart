import { useState } from "react";
import { useCreateReview } from "@/hooks/useCreateReview";
import toast from "react-hot-toast";

interface ReviewModalProps {
  productId: string;
  onClose: () => void;
}

const ReviewModal = ({ productId, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview();

  const handleStarClick = (star: number) => {
    // Toggle: if clicking the same star, deselect it
    setRating(rating === star ? 0 : star);
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await createReview.mutateAsync({
        productId,
        rating,
        comment,
      });

      toast.success("Review submitted successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Write a Review</h2>

        {/* Star Selector */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className="focus:outline-none"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill={star <= rating ? "#facc15" : "none"}
                stroke="#facc15"
                strokeWidth="1.5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm resize-none"
          rows={4}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createReview.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            {createReview.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
