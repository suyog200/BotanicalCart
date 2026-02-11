import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { Address } from "@/api/addresses";

const CHECKOUT_STORAGE_KEY = "botanical_checkout_data";

interface CheckoutContextType {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
  clearCheckoutData: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [selectedAddress, setSelectedAddressState] = useState<Address | null>(
    () => {
      try {
        const stored = sessionStorage.getItem(CHECKOUT_STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          return data.selectedAddress || null;
        }
      } catch (error) {
        console.error("Error loading checkout data:", error);
      }
      return null;
    },
  );

  // Persist to sessionStorage whenever selectedAddress changes
  useEffect(() => {
    try {
      if (selectedAddress) {
        sessionStorage.setItem(
          CHECKOUT_STORAGE_KEY,
          JSON.stringify({ selectedAddress }),
        );
      } else {
        sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving checkout data:", error);
    }
  }, [selectedAddress]);

  const setSelectedAddress = (address: Address | null) => {
    setSelectedAddressState(address);
  };

  const clearCheckoutData = () => {
    setSelectedAddressState(null);
    sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
  };

  const value: CheckoutContextType = {
    selectedAddress,
    setSelectedAddress,
    clearCheckoutData,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
