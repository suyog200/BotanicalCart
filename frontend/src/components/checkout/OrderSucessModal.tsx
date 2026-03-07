interface OrderSuccessModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderSuccessModal = ({ orderId, onClose }: OrderSuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Order Placed Successfully</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your order has been placed with Cash on Delivery.
        </p>

        <div className="bg-gray-50 p-3 rounded text-sm mb-4">
          <strong>Order ID:</strong> {orderId}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
