export interface User {
  firstName: string;
  lastName: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  user: User;
}

export interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

