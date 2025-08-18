import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Plant } from "@/types/types";
import toast from "react-hot-toast";

// Define the context type

interface CartItems extends Plant {
  quantity: number;
}
interface AppContextType {
  navigate: ReturnType<typeof useNavigate>;
  seller: boolean;
  setIsSeller: (seller: boolean) => void;
  items: CartItems[];
  total: number;
  itemCount: number;
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;

  wishlist: Plant[];
  wishlistCount: number;
  addToWishlist: (plant: Plant) => void;
  removeFromWishlist: (plantId: string) => void;
  toggleWishlist: (plant: Plant) => void;
  isWishlisted: (plantId: string) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [seller, setIsSeller] = useState(false);
  const [items, setItems] = useState<CartItems[]>([]);
  const wishlistKey = "wishlist";
  const [wishlist, setWishlist] = useState<Plant[]>(() => {
    try {
      const raw = localStorage.getItem(wishlistKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  
  useEffect(() => {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, wishlistKey]);

  // add items to cart
  const addToCart = (plant: Plant) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === plant.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
    toast.success(`${plant.name} added to cart!`);
  };

  // remove items from cart
  const removeFromCart = (plantId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== plantId));
    toast.success("Item removed from cart!");
  };

  // update cart quantity
  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === plantId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  //////////WishList
   const wishlistIdSet = useMemo(() => new Set(wishlist.map(p => p.id)), [wishlist]);

  const addToWishlist = (plant: Plant) => {
    setWishlist(prev => (prev.some(p => p.id === plant.id) ? prev : [...prev, plant]));
    toast.success(`${plant.name} added to wishlist`);
  };

  const removeFromWishlist = (plantId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== plantId));
    toast.success("Removed from wishlist");
  };

  const toggleWishlist = (plant: Plant) => {
    setWishlist(prev =>
      prev.some(p => p.id === plant.id)
        ? prev.filter(p => p.id !== plant.id)
        : [...prev, plant]
    );
  };

  const isWishlisted = (plantId: string) => wishlistIdSet.has(plantId);
  const wishlistCount = wishlist.length;

  const value = {
    navigate,
    seller,
    setIsSeller,
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
