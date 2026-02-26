import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Loader, AlertCircle } from "lucide-react";
import { reviews } from "@/data/plantReviews";
import { useAppContext } from "@/context/AppContext";
import { useUser } from "@clerk/clerk-react";
import Badges from "@/components/Badges";
import SimilarPlants from "@/components/SimilarPlants";
import ProductReviews from "@/components/ProductReviews";
import { useFetchSingleProduct } from "@/hooks/useFetchSingleProduct";
import { useSimilarProducts } from "@/hooks/useFetchSimilarProduct";
import { useWishlist } from "@/hooks/useWishlist";
import toast from "react-hot-toast";
import CareInstructions from "@/components/CareInstructions";
import StockInfo from "@/components/StockInfo";
import ProductHeader from "@/components/ProductHeader";
import ProductActions from "@/components/ProductActions";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { addToCart, updateQuantity, items } = useAppContext();
  const {
    product: plant,
    isLoading,
    error,
    refetch,
  } = useFetchSingleProduct(id);
  const { similarProducts, isLoading: loadingSimilar } =
    useSimilarProducts(plant);
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
      toast.success(
        wishlist.isWishlisted(id)
          ? "Added to wishlist"
          : "Removed from wishlist",
      );
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
              <p className="text-muted-foreground">
                Fetching product details for you
              </p>
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
              {error === "Product not found"
                ? "Plant Not Found"
                : "Failed to Load Plant"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error === "Product not found"
                ? "The plant you are looking for does not exist or may have been removed."
                : error ||
                  "Something went wrong while loading the plant details."}
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
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`}
              />
            </Button>
          </div>

          <div className="space-y-6">
            <ProductHeader
              plant={plant}
              averageRating={averageRating}
            />
            <p className="text-lg text-muted-foreground">{plant.description}</p>
            {/* Care Instructions */}
            {plant.careInstructions && plant.careInstructions.length > 0 && (
              <CareInstructions instructions={plant.careInstructions} />
            )}

            {/* Stock Information */}
            <StockInfo units={plant.units} inStock={plant.inStock} />

            <ProductActions
              plant={plant}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={updateQuantity}
            />

            {/* Trust Badges */}
            <Badges />
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={plant.id} />

        {/* Similar Products */}
        <SimilarPlants
          similarPlants={similarProducts}
          isLoading={loadingSimilar}
        />
      </div>
    </div>
  );
}
