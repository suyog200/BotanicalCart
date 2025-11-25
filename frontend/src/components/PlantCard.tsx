// src/components/PlantCard.tsx
import type { Plant } from "@/hooks/usePlants";
import { Link } from "react-router-dom";
import { CardFooter } from "./ui/card";
import { useAppContext } from "@/context/AppContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/colorCategories";
import toast from "react-hot-toast";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { addToCart } = useAppContext();

  const wishlist = useWishlist(1, 20);
  const wishlisted = wishlist.isWishlisted(plant.id);

  // Primary category for badge
  const primaryCategory = plant.category?.[0] || "Unknown";

  const handleToggle = async (e: React.MouseEvent) => {
    // prevent card click (navigation) when toggling wishlist
    e.preventDefault();
    e.stopPropagation();
    try {
      await wishlist.toggle({ id: plant.id });
      toast.success(wishlist.isWishlisted(plant.id) ? "Added to wishlist" : "Removed from wishlist");
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
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              src={plant.imageUrl}
              alt={plant.name}
            />

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-accent transition-all duration-200"
              onClick={(e) => {
                // keep the click inside button only — call handleToggle
                handleToggle(e);
              }}
            >
              <Heart
                className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`}
              />
            </Button>

            {/* Primary Category Badge */}
            <Badge className={`absolute top-2 left-2 ${getCategoryColor(primaryCategory)}`}>
              {primaryCategory.replace("-", " ")}
            </Badge>

            {/* Stock Status Badge */}
            <Badge
              className={`absolute bottom-2 right-2 ${
                plant.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {plant.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        <div className="px-5 pb-4 mt-2">
          <h5 className="text-xl font-semibold tracking-tight text-black">{plant.name}</h5>
          <p
            className="text-sm font-medium text-gray-500 truncate"
            title={plant.description}
          >
            {plant.description?.length > 50 ? plant.description.slice(0, 47) + "..." : plant.description}
          </p>

          {/* Multiple Categories Display */}
          {plant.category && plant.category.length > 1 && (
            <div className="flex flex-wrap gap-1 mt-2 mb-2">
              {plant.category.slice(1).map((cat, index) => (
                <Badge key={index} variant="outline" className={`text-xs ${getCategoryColor(cat)}`}>
                  {cat.replace("-", " ")}
                </Badge>
              ))}
            </div>
          )}

          {/* Rating Stars */}
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${index < 4 ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
              4.0
            </span>
          </div>
        </div>
      </Link>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">₹{plant.price}</span>

        {/* Add to Cart / Quantity Controls */}
        <div className="text-white" onClick={(e) => e.stopPropagation()}>
            <button
              className={`${
                plant.inStock ? "bg-gradient-hero hover:shadow-hover cursor-pointer" : "bg-gray-400 cursor-not-allowed"
              } transition-all duration-300 text-white flex items-center gap-2 px-3 py-1 rounded`}
              onClick={() => {
                if (plant.inStock) {
                  addToCart(plant);
                } else {
                  toast.error("This plant is currently out of stock");
                }
              }}
              disabled={!plant.inStock}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
