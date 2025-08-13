import { createContext, useContext, useState } from "react";
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
