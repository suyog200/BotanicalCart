import { useState } from "react";
import type { AddressFormData } from "@/validateSchema/addressSchema";
import { useAppContext } from "@/context/AppContext";
import {
  MapPin,
  ShoppingCart,
  CreditCard,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { createOrder } from "@/api/orders";
import OrderSuccessModal from "./OrderSucessModal";
import toast from "react-hot-toast";

interface ReviewStepProps {
  address: AddressFormData;
  onBack: () => void;
  onOrderComplete: () => void;
}

const ReviewStep = ({ address, onBack, onOrderComplete }: ReviewStepProps) => {
  const { items, total, clearCart, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const payload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        ...address,
      };

      const res = await createOrder(payload);

      setOrderId(res.data.id);
      onOrderComplete();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
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
            <h2 className="text-xl font-semibold text-gray-900">
              Review Your Order
            </h2>
            <p className="text-sm text-gray-500">
              Please verify all details before placing your order
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Address & Contact */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="border-t border-gray-200 my-3 pt-3">
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

          {/* Order Items Card */}
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
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (estimated)</span>
                <span className="font-medium text-gray-900">
                  ₹{(total * 0.1).toFixed(2)}
                </span>
              </div> */}

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{(total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <CreditCard className="w-5 h-5" />
                {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
              </button>

              <button
                onClick={onBack}
                className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Address
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <svg
                  className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Your payment information is secured with 256-bit SSL
                  encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sucess Modal */}
      {orderId && (
          <OrderSuccessModal orderId={orderId} onClose={handleSuccessClose} />
      )}
    </div>
  );
};

export default ReviewStep;
