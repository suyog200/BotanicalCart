import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { plants } from "@/data/plantsData";
import { reviews } from "@/data/plantReviews";
import { categoryColors } from "@/lib/colorCategories";
import { useAppContext } from "@/context/AppContext";
import Badges from "@/components/Badges";
import SimilarPlants from "@/components/SimilarPlants";

export default function ProductDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, updateQuantity, items } = useAppContext();

  const plant = plants.find((p) => p.id === id);
  const cartItem = items.find((item) => item.id === plant?.id);
  const quantity = cartItem?.quantity ?? 0;

  const plantReviews = reviews.filter((r) => r.plantId === id);
  const averageRating =
    plantReviews.length > 0
      ? plantReviews.reduce((sum, r) => sum + r.rating, 0) / plantReviews.length
      : 0;

  // Similar plants from same category
  const similarPlants = plants
    .filter((p) => p.id !== id && p.category === plant?.category)
    .slice(0, 3);

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Plant not found
          </h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-plant"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 right-4 bg-white/80 hover:bg-white transition-all duration-200 ${
                isFavorite ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className={categoryColors[plant.category]}>
                {plant.category.replace("-", " ")}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mt-2">
                {plant.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({plantReviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{plant.description}</p>

            <div className="bg-sage/20 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                Care Instructions
              </h3>
              <p className="text-muted-foreground">{plant.care}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">
                ₹{plant.price}
              </span>
              <div
                className="text-white flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {quantity === 0 ? (
                  <button
                    className="bg-white cursor-pointer text-black flex items-center gap-2 px-3 py-1 rounded border border-black-300 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      addToCart(plant);
                    }}
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
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-white rounded select-none text-black border border-black-300">
                    <button
                      onClick={() => {
                        updateQuantity(plant.id, quantity - 1);
                      }}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      -
                    </button>
                    <span className="w-5 text-center">{quantity}</span>
                    <button
                      onClick={() => {
                        updateQuantity(plant.id, quantity + 1);
                      }}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      +
                    </button>
                  </div>
                )}
                <div>
                  <button className="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-primary/80 active:scale-95 transition-all duration-200 cursor-pointer">
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
        {/* <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
            
            {plantReviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Be the first to review this plant!</p>
            ) : (
              <div className="space-y-6">
                {plantReviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{review.username}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Similar Products */}
        <SimilarPlants similarPlants={similarPlants} />
      </div>
    </div>
  );
}
