import { useMemo, useCallback } from "react";
import { useAllProductReviews } from "@/hooks/useAllProductReviews";
import { useWishlist } from "@/hooks/useWishlist";
import { useHomepageProducts } from "@/hooks/useHomePageProducts";
import { useNavigate } from "react-router-dom";
import type { Plant } from "@/types/types";
import { ColorfulTextHeader } from "./ColorfulTextHeader";
import { Leaf } from "lucide-react";
import PlantCard from "./PlantCard";
import { Button } from "./ui/button";
import ProductGridSkeleton from "./skeleton/ProductGridSkeleton";

const MainContent: React.FC = () => {
  const { data: products, isLoading } = useHomepageProducts();
  const navigate = useNavigate();

  const displayedProducts: Plant[] = products?.slice(0, 50) || [];

  // Extract IDs only when products change
  const productIds = useMemo(
    () => displayedProducts.map((p) => p.id),
    [displayedProducts]
  );

  // One bulk fetch for all reviews, one wishlist instance
  const { data: reviewMap = {} } = useAllProductReviews(productIds);
  const wishlist = useWishlist(1, 20);

  const handleWishlistToggle = useCallback(
    async (id: string) => {
      await wishlist.toggle({ id });
    },
    [wishlist]
  );

  // ... loading/error states unchanged ...
  if (isLoading) return <ProductGridSkeleton />;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <ColorfulTextHeader featuredText="featured" text1="Our" text2="Collection" />
      </div>
      {displayedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                reviewSummary={reviewMap[plant.id]}
                isWishlisted={wishlist.isWishlisted(plant.id)}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button onClick={() => navigate("/products")} size="lg" className="px-8 py-6 text-lg">
              View More Products
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default MainContent;