// src/components/wishlist/WishlistItemCard.tsx
import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import type { WishlistItem } from "@/types/wishListTypes";
import { Link } from "react-router-dom";

interface Props {
  item: WishlistItem;
  loading?: boolean; 
  onRemove: (productId: string) => void;
  onAddToCart: (product: any) => void;
  onToggle?: (productId: string) => void; 
}

const WishlistItemCard: React.FC<Props> = ({ item, loading = false, onRemove, onAddToCart }) => {
  const product = item.product;
  if (!product) return null; // defensive

  return (
    <div className="flex items-center w-full bg-white p-4 rounded-lg shadow-sm">
      <Link to={`/plants-details/${product.id}`} className="flex-shrink-0">
        <img
          src={product.imageUrl || ""}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-md"
          loading="lazy"
        />
      </Link>

      <div className="flex-1 px-6 min-w-0">
        <Link to={`/plants-details/${product.id}`}>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <span className="text-lg font-bold block mt-2">₹{product.price}</span>
        </Link>
      </div>

      <div className="flex flex-row gap-2 items-end">
        <button
          className="flex items-center gap-2 text-sm px-4 py-2 text-gray-700 cursor-pointer"
          onClick={() => onRemove(product.id)}
          title="Remove from wishlist"
          disabled={loading}
          aria-label={`Remove ${product.name} from wishlist`}
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Remove</span>
        </button>

        <button
          className="flex items-center gap-2 text-sm px-4 py-2 rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dull)] transition"
          onClick={() => {
            onAddToCart(product);
            onRemove(product.id);
          }}
          title="Add to cart"
          disabled={loading || !product.inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">{product.inStock ? "Add to cart" : "Out of stock"}</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
