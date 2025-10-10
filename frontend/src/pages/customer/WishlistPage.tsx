import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useAppContext();

  if (!wishlist.length) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2">Start adding your favorite plants!</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition"
        >
          Browse plants
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
      <div className="flex flex-col gap-6">
        {wishlist.map((plant) => (
          <div
            key={plant.id}
            className="flex items-center w-full bg-white p-4 rounded-lg"
          >
            <Link to={`/plantsDetails/${plant.id}`} className="flex-shrink-0">
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-32 h-32 object-cover rounded-md"
              />
            </Link>
            <div className="flex-1 px-6 min-w-0">
              <Link to={`/plants/${plant.id}`}>
                <h3 className="font-semibold text-lg truncate">{plant.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {plant.description}
                </p>
                <span className="text-lg font-bold block mt-2">
                  ${plant.price}
                </span>
              </Link>
            </div>
            <div className="flex flex-row gap-2 items-end">
              <button
                className="flex items-center gap-2 text-sm px-4 py-2 text-gray-700 cursor-pointer"
                onClick={() => removeFromWishlist(plant.id)}
                title="Remove from wishlist"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Remove</span>
              </button>
              <button
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition cursor-pointer"
                onClick={() => addToCart(plant)}
                title="Add to cart"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
