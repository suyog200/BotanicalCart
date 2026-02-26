// src/components/PlantCard.tsx
import type { Plant } from "@/types/types"; // Import from types instead of usePlants
import { Link } from "react-router-dom";
import { CardFooter } from "./ui/card";
import { useAppContext } from "@/context/AppContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/colorCategories";
import { useProductReviews } from "@/hooks/useProductReviews";
import toast from "react-hot-toast";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { addToCart } = useAppContext();
  const { data: reviewsData } = useProductReviews(plant.id);

  const wishlist = useWishlist(1, 20);
  const wishlisted = wishlist.isWishlisted(plant.id);

  // Primary category for badge
  const primaryCategory = plant.categories?.[0]?.name || "Unknown";

  const reviews = reviewsData?.reviews || [];
  const avgRating = reviewsData?.averageRating || null;

  const handleToggle = async (e: React.MouseEvent) => {
    // prevent card click (navigation) when toggling wishlist
    e.preventDefault();
    e.stopPropagation();
    try {
      await wishlist.toggle({ id: plant.id });
      toast.success(
        wishlist.isWishlisted(plant.id)
          ? "Added to wishlist"
          : "Removed from wishlist",
      );
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Could not update wishlist. Try again.");
    }
  };

  return (
    <div className="group rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg bg-white">
      <Link to={`/plants-details/${plant.id}`} className="group block">
        <div className="relative overflow-hidden">
          <div className="rounded-t-lg overflow-hidden">
            <img
              className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              src={plant.imageUrl}
              alt={plant.name}
            />

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-accent transition-all duration-200"
              onClick={handleToggle}
            >
              <Heart
                className={`h-5 w-5 ${
                  wishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </Button>

            {/* Primary Category Badge */}
            <Badge
              className={`absolute top-2 left-2 text-xs sm:text-sm ${getCategoryColor(
                primaryCategory,
              )}`}
            >
              {primaryCategory.replace("-", " ")}
            </Badge>

            {/* Stock Status Badge */}
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

          {/* Multiple Categories Display */}
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

          {/* Rating Stars */}
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {reviews && reviews.length > 0 && avgRating ? (
                <>
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill={
                          ratingValue <= Math.round(avgRating)
                            ? "#FBBF24"
                            : "none"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 0L8.66 4.47H13.66L9.5 7.24L11.16 11.71L7 8.94L2.84 11.71L4.5 7.24L0.34 4.47H5.34L7 0Z"
                          stroke="#FBBF24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );
                  })}
                </>
              ) : (
                <span className="text-gray-400 text-sm">No reviews</span>
              )}
            </div>
            <span className="bg-blue-100 text-blue-800 mt-0.5 ml-2 px-1.5 py-0.5 rounded text-xs font-medium">
              {avgRating ?? "N/A"}
            </span>
          </div>
        </div>
      </Link>

      <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between gap-2">
        <span className="text-xl sm:text-2xl font-bold text-primary">
          ₹{plant.price}
        </span>

        {/* Add to Cart / Quantity Controls */}
        <div className="text-white" onClick={(e) => e.stopPropagation()}>
          <button
            className={`${
              plant.inStock
                ? "bg-gradient-hero hover:shadow-hover cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } transition-all duration-300 text-white flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap`}
            onClick={() => {
              if (plant.inStock) {
                addToCart(plant);
              } else {
                toast.error("This plant is currently out of stock");
              }
            }}
            disabled={!plant.inStock}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {plant.inStock ? "Add" : "Out of Stock"}
          </button>
        </div>
      </CardFooter>
    </div>
  );
};

export default PlantCard;
