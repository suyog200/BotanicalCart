import { useParams } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { reviews } from "@/data/plantReviews";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const PlantReviews = () => {
  const { id } = useParams();
  const plantReviews = reviews.filter((r) => r.plantId === id);
  return (
    <Card className="mb-12 bg-[var(--color-card)] border-none bg-gradient-to-br from-[var(--color-card)] to-[var(--background)]">
      <CardContent className="p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-[var(--color-hero-text-heading)] mb-6">
          Customer Reviews
        </h2>

        {plantReviews.length === 0 ? (
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review this plant!
          </p>
        ) : (
          <div className="space-y-6">
            {plantReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-[var(--color-sage)] pb-6 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--color-hero-text-accent)]">
                      {review.username}
                    </span>
                    {review.verified && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-[var(--color-primary)] text-white"
                      >
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current drop-shadow"
                          : "text-sage"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[var(--color-hero-text-subtitle)]">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlantReviews;
