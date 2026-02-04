import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressFormData,
} from "@/validateSchema/addressSchema";
import { MapPin } from "lucide-react";

interface AddressStepProps {
  onSubmit: (data: AddressFormData) => void;
}

const AddressStep = ({ onSubmit }: AddressStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Shipping Address
          </h2>
          <p className="text-sm text-gray-500">Enter your delivery details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <span className="text-xs">⚠</span> {errors.addressLine1.message}
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
                placeholder="12345"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="text-xs">⚠</span> {errors.postalCode.message}
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
                placeholder="United States"
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

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
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
        </div>
      </form>
    </div>
  );
};

export default AddressStep;
