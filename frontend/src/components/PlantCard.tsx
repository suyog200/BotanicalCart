import type { Plant } from "@/types/types";
import { Link } from "react-router-dom";
import { CardFooter } from "./ui/card";
import { useAppContext } from "@/context/AppContext";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/colorCategories";
import toast from "react-hot-toast";
import { memo, useCallback } from "react";

interface ReviewSummary {
  averageRating: number | null;
  totalReviews: number;
}

interface PlantCardProps {
  plant: Plant;
  reviewSummary?: ReviewSummary; // passed from parent
  isWishlisted?: boolean; // passed from parent
  onWishlistToggle?: (id: string) => Promise<void>; // passed from parent
}

const StarRating = memo(({ avgRating }: { avgRating: number }) => (
  <div className="flex items-center space-x-1 rtl:space-x-reverse">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={i <= Math.round(avgRating) ? "#FBBF24" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L8.66 4.47H13.66L9.5 7.24L11.16 11.71L7 8.94L2.84 11.71L4.5 7.24L0.34 4.47H5.34L7 0Z"
          stroke="#FBBF24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ))}
  </div>
));

const PlantCard = memo(
  ({
    plant,
    reviewSummary,
    isWishlisted = false,
    onWishlistToggle,
  }: PlantCardProps) => {
    const { addToCart } = useAppContext();
    const primaryCategory = plant.categories?.[0]?.name || "Unknown";

    const handleToggle = useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!onWishlistToggle) {
          toast.error("Wishlist feature unavailable");
          return;
        }
        try {
          await onWishlistToggle(plant.id);
          toast.success(
            isWishlisted ? "Removed from wishlist" : "Added to wishlist",
          );
        } catch {
          toast.error("Could not update wishlist. Try again.");
        }
      },
      [plant.id, isWishlisted, onWishlistToggle],
    );

    const handleAddToCart = useCallback(() => {
      if (plant.inStock) {
        addToCart(plant);
      } else {
        toast.error("This plant is currently out of stock");
      }
    }, [plant, addToCart]);

    return (
      <div className="group rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg bg-white">
        <Link to={`/plants-details/${plant.id}`} className="group block">
          <div className="relative overflow-hidden">
            <div className="rounded-t-lg overflow-hidden">
              <img
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                src={plant.imageUrl}
                alt={plant.name}
                loading="lazy"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-accent transition-all duration-200"
                onClick={handleToggle}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                />
              </Button>

              <Badge
                className={`absolute top-2 left-2 text-xs sm:text-sm ${getCategoryColor(primaryCategory)}`}
              >
                {primaryCategory.replace("-", " ")}
              </Badge>

              <Badge
                className={`absolute bottom-2 right-2 text-xs sm:text-sm ${
                  plant.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {plant.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 mt-2">
            <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-black line-clamp-1">
              {plant.name}
            </h5>
            <p
              className="text-xs sm:text-sm font-medium text-gray-500 line-clamp-2 mt-1"
              title={plant.description}
            >
              {plant.description}
            </p>

            {plant.categories && plant.categories.length > 1 && (
              <div className="flex flex-wrap gap-1 mt-2 mb-2">
                {plant.categories.slice(1).map((category, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`text-xs ${getCategoryColor(category.name)}`}
                  >
                    {category.name.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center mt-2.5 mb-5">
              {reviewSummary && reviewSummary.averageRating ? (
                <>
                  <StarRating avgRating={reviewSummary.averageRating} />
                  <span className="bg-blue-100 text-blue-800 mt-0.5 ml-2 px-1.5 py-0.5 rounded text-xs font-medium">
                    {reviewSummary.averageRating.toFixed(1)}
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-sm">No reviews</span>
              )}
            </div>
          </div>
        </Link>

        <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between gap-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            ₹{plant.price}
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <button
              className={`${
                plant.inStock
                  ? "bg-gradient-hero hover:shadow-hover cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-all duration-300 text-white flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap`}
              onClick={handleAddToCart}
              disabled={!plant.inStock}
            >
              {plant.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </CardFooter>
      </div>
    );
  },
);

export default PlantCard;
