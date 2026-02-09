import { Loader, Leaf } from "lucide-react";
import PlantCard from "./PlantCard";
import { useHomepageProducts } from "@/hooks/useHomePageProducts";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { Plant } from "@/types/types";
import { ColorfulTextHeader } from "./ColorfulTextHeader";

const MainContent: React.FC = () => {
  const { data: products, isLoading, isError, error } = useHomepageProducts();
  const navigate = useNavigate();

  // Limit to top 50 products
  const displayedProducts: Plant[] = products?.slice(0, 50) || [];

  const handleViewMore = () => {
    navigate("/products"); // Navigate to all products page
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Loading Products...
            </h3>
            <p className="text-muted-foreground">
              Fetching the latest featured products for you
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (isError) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Failed to Load Products
          </h3>
          <p className="text-muted-foreground mb-4">
            {String(error ?? "Unknown error")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <ColorfulTextHeader featuredText="featured" text1="Our" text2="Collection" />
      </div>
      {displayedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No products found
          </h3>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              onClick={handleViewMore}
              size="lg"
              className="px-8 py-6 text-lg"
            >
              View More Products
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default MainContent;
