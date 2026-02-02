import { XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder } from "@/api/orders";
import type { Order } from "@/types/order";

interface CancelOrderButtonProps {
  order: Order;
}

const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  const queryClient = useQueryClient();

  // Only allow cancel for valid states
  const cancellableStatuses = ["CREATED", "CONFIRMED"];

  if (!cancellableStatuses.includes(order.status)) {
    return null;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => cancelOrder(order.id),
    onSuccess: () => {
      toast.success("Order cancelled successfully");

      // Refresh user's orders list
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    },
  });

  const handleCancel = () => {
    // Optional confirmation
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (!confirmed) return;

    mutate();
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3
          bg-red-50 hover:bg-red-100
          text-red-600 hover:text-red-700
          font-semibold rounded-lg
          transition-colors
          border-2 border-red-200 hover:border-red-300
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <XCircle className="w-5 h-5" />
        {isPending ? "Cancelling..." : "Cancel Order"}
      </button>
    </div>
  );
};

export default CancelOrderButton;
