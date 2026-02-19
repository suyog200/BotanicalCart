import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "@/api/api";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  const sessionId = searchParams.get("session_id");

useEffect(() => {
  const verifyPayment = async () => {
    if (!sessionId) return;

    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(
          `/api/v1/payments/stripe/verify-session?session_id=${sessionId}`
        );

        setOrder(res.data.order);
        clearCart();
        clearInterval(interval);
        setLoading(false);
      } catch (error) {
        attempts++;

        if (attempts >= 5) {
          clearInterval(interval);
          setLoading(false);
          toast.error("Payment verification delayed. Please check Orders page.");
          navigate("/orders");
        }
      }
    }, 2000);
  };

  verifyPayment();
}, [sessionId]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-700 mb-4">
          Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Order ID: <strong>{order?.id}</strong>
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
