import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Plant } from "@/types/types";
import toast from "react-hot-toast";

const CART_STORAGE_KEY = "botanical_cart_items";

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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [seller, setIsSeller] = useState(false);
  const [items, setItems] = useState<CartItems[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // add items to cart
  const addToCart = (plant: Plant) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === plant.id);
      if (existingItem) {
        toast.error(`${plant.name} is already in your cart!`);
        return prev;
      }
      toast.success(`${plant.name} added to cart!`);
      return [...prev, { ...plant, quantity: 1 }];
    });
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
      prev.map((item) => {
        if (item.id === plantId) {
          // Ensure quantity doesn't exceed available units
          const maxQuantity = Math.min(quantity, item.units);

          if (quantity > item.units) {
            toast.error(`Only ${item.units} units available for ${item.name}`);
          }

          return { ...item, quantity: maxQuantity };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
