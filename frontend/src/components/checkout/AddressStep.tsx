import { useState } from "react";
import { MapPin, Plus, Loader2 } from "lucide-react";
import type { Address } from "@/api/addresses";
import { useAddresses, useDeleteAddress } from "@/hooks/useAddresses";
import SavedAddressCard from "./SavedAddressCard";
import AddressFormModal from "./AddressFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useCheckout } from "@/context/CheckoutContext";

interface AddressStepProps {
  onContinue: () => void;
}

const AddressStep = ({ onContinue }: AddressStepProps) => {
  const { selectedAddress, setSelectedAddress } = useCheckout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  // Fetch addresses using TanStack Query
  const { data: addresses = [], isLoading, error } = useAddresses();
  const deleteAddressMutation = useDeleteAddress();

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (addressId: string) => {
    setAddressToDelete(addressId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      deleteAddressMutation.mutate(addressToDelete, {
        onSuccess: () => {
          // If deleted address was selected, clear selection
          if (selectedAddress?.id === addressToDelete) {
            setSelectedAddress(null);
          }
          setDeleteConfirmOpen(false);
          setAddressToDelete(null);
        },
      });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setAddressToDelete(null);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      return;
    }
    onContinue();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Shipping Address
            </h2>
            <p className="text-sm text-gray-500">
              Select or add a delivery address
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              Failed to load addresses. Please try again.
            </p>
          </div>
        )}

        {/* Saved Addresses */}
        {!isLoading && !error && addresses.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Saved Addresses
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((address) => (
                <SavedAddressCard
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress?.id === address.id}
                  onSelect={handleAddressSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Addresses State */}
        {!isLoading && !error && addresses.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg mb-6">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No saved addresses</p>
            <p className="text-sm text-gray-500">
              Add your first delivery address
            </p>
          </div>
        )}

        {/* Add New Address Button */}
        <button
          type="button"
          onClick={handleAddNew}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 font-medium rounded-lg hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>

        {/* Continue Button */}
        <div className="pt-6 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedAddress}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            Continue to Review
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          {!selectedAddress && (
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please select or add an address to continue
            </p>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        address={editingAddress}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={deleteAddressMutation.isPending}
      />
    </>
  );
};

export default AddressStep;
