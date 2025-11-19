// src/pages/WishlistPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import WishlistItemCard from "@/components/WishlistItemCard";
import { useWishlist } from "@/hooks/useWishlist"; 

const WishlistPage: React.FC = () => {
  const { addToCart } = useAppContext(); 
  const page = 1;
  const limit = 20;

  const { data: wishlistResponse, isLoading, isError, add, remove, toggle, isWishlisted } = useWishlist(page, limit);

  const items = wishlistResponse?.data ?? [];
  const total = wishlistResponse?.total ?? 0;

  if (isLoading) {
    return <div className="py-16 text-center">Loading wishlist…</div>;
  }

  if (isError) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Couldn’t load wishlist</h2>
        <p className="text-gray-500 mt-2">Try again later.</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2">Start adding your favorite plants!</p>
        <Link to="/" className="inline-block mt-6 bg-[var(--color-primary)] text-white px-6 py-2 rounded-full">
          Browse plants
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist ({total})</h1>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <WishlistItemCard
            key={item.id}
            item={item}
            loading={false}
            onRemove={(productId) => remove(productId)}
            onAddToCart={(product) => addToCart(product)}
          />
        ))}
      </div>

      {/* Pagination placeholder (implement as needed) */}
      {total > limit && (
        <div className="mt-6 flex justify-center">
          {/* wire pagination controls to useWishlist(page) or to update query args */}
          <button className="px-4 py-2 border rounded">Load more</button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
