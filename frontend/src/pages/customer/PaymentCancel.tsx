import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <div className="mb-4 text-5xl">❌</div>

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-700 mb-6">
          Your payment has been cancelled. Your cart items are still saved, and
          you can retry the payment whenever you're ready.
        </p>

        <div className="flex gap-3 flex-col sm:flex-row">
          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Return to Checkout
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
