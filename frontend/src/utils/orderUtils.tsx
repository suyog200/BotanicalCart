import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const getStatusConfig = (status: string) => {
  const configs: Record<
    string,
    { icon: React.ReactElement; color: string; bg: string }
  > = {
    pending: {
      icon: <Clock className="w-4 h-4" />,
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    processing: {
      icon: <Package className="w-4 h-4" />,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    shipped: {
      icon: <Truck className="w-4 h-4" />,
      color: "text-purple-700",
      bg: "bg-purple-100",
    },
    delivered: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    cancelled: {
      icon: <XCircle className="w-4 h-4" />,
      color: "text-red-700",
      bg: "bg-red-100",
    },
  };

  return configs[status.toLowerCase()] || configs.pending;
};