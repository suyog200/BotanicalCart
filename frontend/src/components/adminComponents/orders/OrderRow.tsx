interface AdminOrder {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  user: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface Props {
  order: AdminOrder;
  onViewDetails: (orderId: string) => void;
}

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    CREATED: "bg-blue-100 text-blue-700",
    CONFIRMED: "bg-purple-100 text-purple-700",
    SHIPPED: "bg-yellow-100 text-yellow-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getPaymentColor = (status: string) => {
  return status === "PAID"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-orange-100 text-orange-700";
};

export const OrderRow = ({ order, onViewDetails }: Props) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-mono text-gray-900">
          #{order.id.slice(0, 8)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-primary">
              {order.user.firstName?.[0] || order.user.email[0].toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {order.user.firstName && order.user.lastName
                ? `${order.user.firstName} ${order.user.lastName}`
                : order.user.email}
            </p>
            {order.user.firstName && (
              <p className="text-xs text-gray-500">{order.user.email}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(order.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-gray-900">
          ₹{order.totalAmount.toLocaleString()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentColor(
            order.paymentStatus,
          )}`}
        >
          {order.paymentStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onViewDetails(order.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};
