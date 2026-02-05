import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEnquiriesByOrder } from "@/api/enquiries";

interface OrderEnquiriesProps {
  orderId: string;
}

const getEnquiryStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return {
        color: "text-yellow-700",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: <Clock className="w-4 h-4" />,
        label: "Pending",
      };
    case "in-progress":
      return {
        color: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "In Progress",
      };
    case "resolved":
      return {
        color: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Resolved",
      };
    case "closed":
      return {
        color: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: <XCircle className="w-4 h-4" />,
        label: "Closed",
      };
    default:
      return {
        color: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: <MessageSquare className="w-4 h-4" />,
        label: status,
      };
  }
};

const OrderEnquiries = ({ orderId }: OrderEnquiriesProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["enquiries", orderId],
    queryFn: () => getEnquiriesByOrder(orderId),
    enabled: !!orderId,
  });

  // Extract enquiries array from response
  const enquiries = Array.isArray(data) ? data : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
          <span className="ml-2 text-sm text-gray-600">
            Loading enquiries...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="border-t border-gray-200 pt-4">
        <div className="text-center py-6 text-sm text-red-600">
          Failed to load enquiries
        </div>
      </div>
    );
  }

  // No enquiries
  if (enquiries.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Order Enquiries</h3>
        <span className="text-sm text-gray-500">({enquiries.length})</span>
      </div>

      <div className="space-y-3">
        {enquiries.map((enquiry) => {
          const statusConfig = getEnquiryStatusConfig(enquiry.status);

          return (
            <div
              key={enquiry.id}
              className={`border ${statusConfig.border} rounded-lg p-4 ${statusConfig.bg} hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`mt-0.5 ${statusConfig.color}`}>
                      {statusConfig.icon}
                    </div>
                    <h4 className="font-medium text-gray-900 line-clamp-2">
                      {enquiry.subject}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(enquiry.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border} text-xs font-medium whitespace-nowrap`}
                >
                  {statusConfig.icon}
                  <span>{statusConfig.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-500 italic">
        Enquiries are resolved within 24-48 hours
      </p>
    </div>
  );
};

export default OrderEnquiries;
