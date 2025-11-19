import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ArrowLeft, Loader, AlertCircle } from "lucide-react";
import { reviews } from "@/data/plantReviews";
import { getCategoryColor } from "@/lib/colorCategories";
import { useAppContext } from "@/context/AppContext";
import { useUser } from "@clerk/clerk-react";
import Badges from "@/components/Badges";
import SimilarPlants from "@/components/SimilarPlants";
import PlantReviews from "@/components/PlantReviews";
import { useFetchSingleProduct } from "@/hooks/useFetchSingleProduct";
import { useSimilarProducts } from "@/hooks/useFetchSimilarProduct";
import { useWishlist } from "@/hooks/useWishlist";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { addToCart, updateQuantity, items } = useAppContext();

  const { product: plant, isLoading, error, refetch } = useFetchSingleProduct(id);
  const { similarProducts, isLoading: loadingSimilar } = useSimilarProducts(plant);
  const wishlist = useWishlist(1, 20);
  const wishlisted = wishlist.isWishlisted(id ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const cartItem = items.find((item) => item.id === plant?.id);
  const quantity = cartItem?.quantity ?? 0;

  const plantReviews = reviews.filter((r) => r.plantId === id);
  const averageRating =
    plantReviews.length > 0
      ? plantReviews.reduce((sum, r) => sum + r.rating, 0) / plantReviews.length
      : 0;

  const handleAddToCart = () => {
    if (!plant) return;

    if (plant.inStock) {
      addToCart(plant);
    } else {
      toast.error("This plant is currently out of stock");
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    if (!user) {
      toast("Please sign in to use wishlist", { icon: "🔒" });
      return;
    }

    try {
      await wishlist.toggle({ id });
      toast.success(wishlist.isWishlisted(id) ? "Added to wishlist" : "Removed from wishlist");
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Could not update wishlist. Try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Loading Product...
              </h3>
              <p className="text-muted-foreground">Fetching product details for you</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !plant) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plants
          </Link>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error === "Product not found" ? "Plant Not Found" : "Failed to Load Plant"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error === "Product not found"
                ? "The plant you are looking for does not exist or may have been removed."
                : error || "Something went wrong while loading the plant details."}
            </p>
            <div className="flex gap-4">
              <Link to="/">
                <Button>Return Home</Button>
              </Link>
              {error !== "Product not found" && (
                <Button variant="outline" onClick={refetch}>
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plants
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="relative">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-plant"
            />

            {/* Wishlist Heart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-accent transition-all duration-200"
              onClick={handleToggleWishlist}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
            </Button>

            <Badge
              className={`absolute bottom-2 right-2 ${
                plant.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {plant.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {plant.category.map((cat, index) => (
                  <Badge key={index} className={getCategoryColor(cat)}>
                    {cat.replace("-", " ")}
                  </Badge>
                ))}
                {plant.isFeatured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-foreground mt-2">{plant.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({plantReviews.length} reviews)</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{plant.description}</p>

            {/* Care Instructions */}
            {plant.careInstructions && plant.careInstructions.length > 0 && (
              <div className="bg-sage/20 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Care Instructions</h3>
                <ul className="text-muted-foreground space-y-1">
                  {plant.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-sm gap-1">
                <span className="text-muted-foreground">Available Units:</span>
                <span className="font-medium">{plant.units} left</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">₹{plant.price}</span>
              <div className="text-white flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                {quantity === 0 ? (
                  <button
                    className={`${
                      plant.inStock
                        ? "bg-white cursor-pointer text-black border-black-300 hover:bg-gray-100"
                        : "bg-gray-400 cursor-not-allowed text-gray-600"
                    } flex items-center gap-2 px-3 py-1 rounded border transition-colors duration-200`}
                    onClick={handleAddToCart}
                    disabled={!plant.inStock}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {plant.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-white rounded select-none text-black border border-black-300">
                    <button onClick={() => updateQuantity(plant.id, quantity - 1)} className="cursor-pointer text-md px-2 h-full hover:bg-gray-100 transition-colors">-</button>
                    <span className="w-5 text-center">{quantity}</span>
                    <button onClick={() => updateQuantity(plant.id, quantity + 1)} className="cursor-pointer text-md px-2 h-full hover:bg-gray-100 transition-colors" disabled={quantity >= plant.units}>+</button>
                  </div>
                )}
                <div>
                  <button className={`${plant.inStock && quantity > 0 ? "bg-primary hover:bg-primary/80 cursor-pointer" : "bg-gray-400 cursor-not-allowed"} text-white font-medium text-sm px-6 py-2 rounded-md active:scale-95 transition-all duration-200`} disabled={!plant.inStock || quantity === 0}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <Badges />
          </div>
        </div>

        {/* Reviews Section */}
        <PlantReviews />

        {/* Similar Products */}
        <SimilarPlants similarPlants={similarProducts} isLoading={loadingSimilar} />
      </div>
    </div>
  );
}
