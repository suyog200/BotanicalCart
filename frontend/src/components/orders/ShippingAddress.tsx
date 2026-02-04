import { MapPin } from "lucide-react";
import type { Order } from "@/types/order";

interface ShippingAddressProps {
  order: Order;
}

const ShippingAddress = ({ order }: ShippingAddressProps) => {
  return (
    <div className="pt-4 border-t border-gray-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Shipping Address
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{order.addressLine1}</p>
            {order.addressLine2 && <p>{order.addressLine2}</p>}
            <p>
              {order.city}, {order.state} {order.postalCode}
            </p>
            <p className="font-medium">{order.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;