import { useState } from "react";
import { XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder } from "@/api/orders";
import type { Order } from "@/types/order";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import axios from "axios";

interface CancelOrderButtonProps {
  order: Order;
}

const CANCELLABLE_STATUSES = ["CREATED", "CONFIRMED"];

const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  if (!CANCELLABLE_STATUSES.includes(order.status)) return null;

  const { mutate, isPending } = useMutation({
    mutationFn: () => cancelOrder(order.id),
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      setShowConfirm(false);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to cancel order";
      toast.error(message || "Failed to cancel order");
    },
  });

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center justify-center gap-2 px-6 py-3
          bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700
          font-semibold rounded-lg transition-colors
          border-2 border-red-200 hover:border-red-300"
      >
        <XCircle className="w-5 h-5" />
        Cancel Order
      </button>

      {showConfirm && (
        <ConfirmModal
          question="Cancel this order?"
          description="This action cannot be undone. Your order will be permanently cancelled."
          confirmLabel="Yes, Cancel Order"
          cancelLabel="Keep Order"
          isDestructive
          isPending={isPending}
          onConfirm={() => mutate()}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default CancelOrderButton;