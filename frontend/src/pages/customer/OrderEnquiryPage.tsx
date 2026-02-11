import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowLeft, Send, MessageSquare } from "lucide-react";
import { createEnquiry } from "@/api/enquiries";
import type { EnquiryFormData } from "@/types/enquiry";
import enquirySchema from "@/validateSchema/enquirySchema";

const OrderEnquiryPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EnquiryFormData) => {
      const payload = {
        orderId: orderId!,
        subject: data.subject,
        message: data.description,
      };
      return createEnquiry(payload);
    },
    onSuccess: (data) => {
      toast.success(
        "Enquiry submitted successfully! We'll get back to you soon.",
      );
      reset();
      navigate("/orders");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to submit enquiry";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: EnquiryFormData) => {
    if (!orderId) {
      toast.error("Order ID is missing");
      return;
    }
    mutate(data);
  };

  // If no orderId, show error message
  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Order ID is missing from URL</p>
          <button
            onClick={() => navigate("/orders")}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Go back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Orders</span>
        </button>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Submit an Enquiry
              </h1>
              <p className="text-gray-600 mt-2">
                Have questions about your order? Let us know and we'll respond
                as soon as possible.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Order ID: <span className="font-semibold">#{orderId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Enquiry
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                {...register("subject")}
                placeholder="e.g., Question about delivery status"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={6}
                placeholder="Please provide detailed information about your enquiry..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Minimum 20 characters required
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/orders")}
                disabled={isPending}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Our support team typically responds within
            24-48 hours. For urgent matters, please contact us directly at
            support@botanicalcart.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderEnquiryPage;
