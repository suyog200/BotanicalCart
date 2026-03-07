import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/checkout/StepIndicator";
import AddressStep from "@/components/checkout/AddressStep";
import ReviewStep from "@/components/checkout/ReviewStep";

type CheckoutStep = 1 | 2;

const CheckoutPageContent = () => {
  const { items, navigate } = useAppContext();
  const { selectedAddress, clearCheckoutData } = useCheckout();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !orderCompleted) {
      navigate("/cart");
    }
  }, [items, navigate, orderCompleted]);

  const handleContinueToReview = () => {
    setStep(2);
  };

  const handleBackToAddress = () => {
    setStep(1);
  };

  const handleOrderComplete = () => {
    setOrderCompleted(true);
    clearCheckoutData();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <StepIndicator step={step} />

      {step === 1 && <AddressStep onContinue={handleContinueToReview} />}

      {step === 2 && selectedAddress && (
        <ReviewStep
          address={selectedAddress}
          onBack={handleBackToAddress}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutPageContent />
    </CheckoutProvider>
  );
};

export default CheckoutPage;
