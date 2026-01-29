import { useEffect, useState } from "react";
import { getAdminOrderById } from "@/api/adminOrders";
import { updateAdminOrder } from "@/api/adminOrders";
import toast from "react-hot-toast";

interface Props {
  orderId: string;
  onClose: () => void;
}

const ORDER_STATUSES = [
  "CREATED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const PAYMENT_STATUSES = ["PENDING", "PAID"];

const OrderDetails = ({ orderId, onClose }: Props) => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAdminOrderById(orderId);
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to load order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setOrderStatus(order.status);
      setPaymentStatus(order.paymentStatus);
    }
  }, [order]);

  if (loading) return null;

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateAdminOrder(orderId, {
        status: orderStatus,
        paymentStatus,
      });

      toast.success("Order updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-full max-w-lg p-6 overflow-y-auto">
        <button onClick={onClose} className="text-sm mb-4">
          Close
        </button>

        <h2 className="text-lg font-semibold mb-2">Order {order.id}</h2>

        <p className="text-sm text-gray-600 mb-4">{order.user.email}</p>

        {/* Items */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Items</h3>
          {order.items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>₹{item.subtotal}</span>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Address</h3>
          <p className="text-sm text-gray-600">
            {order.addressLine1}
            <br />
            {order.city}, {order.state} {order.postalCode}
            <br />
            {order.country}
          </p>
        </div>

        {/* Status */}
        {/* Status Controls */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Order Status
            </label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              {PAYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full bg-primary text-white py-2 rounded"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
