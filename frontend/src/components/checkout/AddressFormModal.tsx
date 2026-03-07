import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressFormData,
} from "@/validateSchema/addressSchema";
import { X } from "lucide-react";
import { useCreateAddress, useUpdateAddress } from "@/hooks/useAddresses";
import type { Address } from "@/api/addresses";
import { useEffect } from "react";

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
}

const AddressFormModal = ({
  isOpen,
  onClose,
  address,
}: AddressFormModalProps) => {
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const isEditMode = !!address;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
    },
  });

  // Reset form with address data when editing
  useEffect(() => {
    if (isEditMode && address) {
      reset({
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || "",
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: address.isDefault,
      });
    } else {
      reset({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });
    }
  }, [isEditMode, address, reset]);

  const onSubmit = (data: AddressFormData) => {
    if (isEditMode && address) {
      // Update existing address
      updateAddressMutation.mutate(
        {
          id: address.id,
          payload: {
            ...data,
            isDefault: data.isDefault ?? false,
          },
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      // Create new address
      createAddressMutation.mutate(
        {
          ...data,
          isDefault: data.isDefault ?? false,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Contact Information
            </h3>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="text-xs">⚠</span> {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="9876543210"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="text-xs">⚠</span> {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Address Details
            </h3>

            <div>
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                id="addressLine1"
                type="text"
                {...register("addressLine1")}
                placeholder="Street address, P.O. box"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.addressLine1 ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="text-xs">⚠</span>{" "}
                  {errors.addressLine1.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="addressLine2"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address Line 2{" "}
                <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                id="addressLine2"
                type="text"
                {...register("addressLine2")}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  {...register("city")}
                  placeholder="Enter city"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="text-xs">⚠</span> {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State / Province <span className="text-red-500">*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  {...register("state")}
                  placeholder="Enter state"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="text-xs">⚠</span> {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="postalCode"
                  type="text"
                  {...register("postalCode")}
                  placeholder="400001"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="text-xs">⚠</span>{" "}
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  {...register("country")}
                  placeholder="India"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span className="text-xs">⚠</span> {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Default Address Checkbox */}
          <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
            <input
              id="isDefault"
              type="checkbox"
              {...register("isDefault")}
              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              <span className="font-medium">Set as default address</span>
              <p className="text-gray-500 mt-0.5">
                This address will be selected by default for future orders
              </p>
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                createAddressMutation.isPending ||
                updateAddressMutation.isPending
              }
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createAddressMutation.isPending ||
              updateAddressMutation.isPending
                ? "Saving..."
                : isEditMode
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
