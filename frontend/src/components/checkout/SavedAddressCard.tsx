import { MapPin, Phone, User, Edit2, Trash2 } from "lucide-react";
import type { Address } from "@/api/addresses";

interface SavedAddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (address: Address) => void;
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
}

const SavedAddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: SavedAddressCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(address);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(address.id);
  };

  return (
    <div
      onClick={() => onSelect(address)}
      className={`relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? "border-green-500 bg-green-50 ring-2 ring-green-500"
          : "border-gray-300 bg-white hover:border-green-300"
      }`}
    >
      {/* Radio Button */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected
              ? "border-green-500 bg-green-500"
              : "border-gray-300 bg-white"
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          )}
        </div>
      </div>

      {/* Default Badge */}
      {address.isDefault && (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Default
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-12 flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          type="button"
          title="Edit address"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          type="button"
          title="Delete address"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Address Content */}
      <div className="space-y-2 pr-8">
        <div className="flex items-start gap-2">
          <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">{address.fullName}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>{address.addressLine1}</p>
            {address.addressLine2 && <p>{address.addressLine2}</p>}
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedAddressCard;
