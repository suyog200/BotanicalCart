import type { Enquiry, EnquiryStatus } from "./enquiry.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useState } from "react";

const getOrderStatusStyle = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "PROCESSING":
      return "bg-green-50 text-green-700 border-green-200";
    case "SHIPPED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "DELIVERED":
      return "bg-green-50 text-green-700 border-green-200";
    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getPaymentStatusStyle = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PAID":
      return "bg-green-50 text-green-700 border-green-200";
    case "PENDING":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "FAILED":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const EnquiryDetailsDrawer = ({
  enquiry,
  open,
  onClose,
}: {
  enquiry: Enquiry;
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState(enquiry.status);

  const mutation = useMutation({
    mutationFn: (status: EnquiryStatus) =>
      api.patch(`/api/v1/admin/enquiries/${enquiry.id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-enquiries"],
      });
    },
  });

  const handleStatusChange = (newStatus: EnquiryStatus) => {
    setSelectedStatus(newStatus);
    mutation.mutate(newStatus);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Enquiry Details</h2>
                <p className="text-sm text-green-100 mt-0.5">
                  ID: {enquiry.id.slice(0, 8)}...
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {enquiry.user.firstName[0]}
                {enquiry.user.lastName[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {enquiry.user.firstName} {enquiry.user.lastName}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {enquiry.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Subject
            </label>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-900 font-medium">{enquiry.subject}</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {enquiry.message}
              </p>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Related Order
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order ID</span>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200">
                  {enquiry.order.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order Status</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getOrderStatusStyle(enquiry.order.status)}`}
                >
                  {enquiry.order.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getPaymentStatusStyle(enquiry.order.paymentStatus)}`}
                >
                  {enquiry.order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Update Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status as EnquiryStatus)}
                  disabled={mutation.isPending}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                    selectedStatus === status
                      ? "bg-green-600 hover:bg-green-700 text-white border-transparent shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>
            {mutation.isPending && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                <svg
                  className="animate-spin h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating status...
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Status updated successfully!
              </p>
            )}
          </div>

          {/* Created At */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Created on{" "}
                {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
