import { useState } from "react";
import type { Address } from "@/api/addresses";
import { useAppContext } from "@/context/AppContext";
import { MapPin, ShoppingCart, ChevronLeft, CheckCircle2, User, Phone } from "lucide-react";
import { createOrder } from "@/api/orders";
import OrderSuccessModal from "./OrderSucessModal";
import toast from "react-hot-toast";
import { useCreateStripeSession } from "@/hooks/useCreateStripeSession";
import axios from "axios";

interface ReviewStepProps {
  address: Address;
  onBack: () => void;
  onOrderComplete: () => void;
}

const ReviewStep = ({ address, onBack, onOrderComplete }: ReviewStepProps) => {
  const { items, total, clearCart, navigate } = useAppContext();
  const stripeMutation = useCreateStripeSession();

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "STRIPE">("COD");

  const isProcessing = loading || stripeMutation.isPending;

  const handlePlaceOrder = async () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    const orderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      if (paymentMethod === "COD") {
        setLoading(true);
        const res = await createOrder({ items: orderItems, ...address});
        setOrderId(res.id);
        // Don't setLoading(false) here — modal handles the next step
        return;
      }

      if (paymentMethod === "STRIPE") {
        const stripeData = await stripeMutation.mutateAsync({
          items: orderItems,
          addressId: address.id,
        });
        // Redirect — no need to reset loading, page is navigating away
        window.location.href = stripeData.url;
        return;
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to place order";
      toast.error(message || "Failed to place order");
      setLoading(false); // Only reset on error, not after Stripe redirect
    }
  };

  const handleSuccessClose = () => {
    onOrderComplete();
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
            <p className="text-sm text-gray-500">Please verify all details before placing your order</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <button
                onClick={onBack}
                className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
              >
                Edit
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-sm font-medium text-gray-900">{address.fullName}</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-sm text-gray-700">{address.phone}</p>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-900 leading-relaxed">
                  {address.addressLine1}
                  {address.addressLine2 && <>, {address.addressLine2}</>}
                  <br />
                  {address.city}, {address.state} {address.postalCode}
                  <br />
                  {address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order Items ({items.length})
              </h3>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4 space-y-6">
            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2" role="radiogroup" aria-label="Payment method">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="STRIPE"
                    checked={paymentMethod === "STRIPE"}
                    onChange={() => setPaymentMethod("STRIPE")}
                  />
                  <span>Online Payment (Card / UPI)</span>
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-green-600">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {isProcessing
                ? paymentMethod === "COD" ? "Placing Order..." : "Redirecting to Payment..."
                : paymentMethod === "COD" ? "Place Order (Cash on Delivery)" : "Pay Now"}
            </button>

            <button
              onClick={onBack}
              className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Address
            </button>
          </div>
        </div>
      </div>

      {orderId && (
        <OrderSuccessModal orderId={orderId} onClose={handleSuccessClose} />
      )}
    </div>
  );
};

export default ReviewStep;