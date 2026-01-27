import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import type { AddressFormData } from "@/validateSchema/addressSchema";
import StepIndicator from "@/components/checkout/StepIndicator";
import AddressStep from "@/components/checkout/AddressStep";
import ReviewStep from "@/components/checkout/ReviewStep";

type CheckoutStep = 1 | 2;

const CheckoutPage = () => {
  const { items, navigate } = useAppContext();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [address, setAddress] = useState<AddressFormData | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);


  useEffect(() => {
    if (items.length === 0 && !orderCompleted) {
      navigate("/cart");
    }
  }, [items, navigate, orderCompleted]);

  const handleAddressSubmit = (data: AddressFormData) => {
    setAddress(data);
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <StepIndicator step={step} />

      {step === 1 && (
        <AddressStep onSubmit={handleAddressSubmit} />
      )}

      {step === 2 && address && (
        <ReviewStep
          address={address}
          onBack={() => setStep(1)}
          onOrderComplete={() => setOrderCompleted(true)}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
