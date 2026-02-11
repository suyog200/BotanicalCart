import { useState } from "react";
import type { Enquiry } from "./enquiry.types";
import { EnquiryDetailsDrawer } from "./EnquiryDetailsDrawer";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-green-50 text-green-700 border-green-200";
    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "RESOLVED":
      return "bg-green-50 text-green-700 border-green-200";
    case "CLOSED":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "OPEN":
      return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "IN_PROGRESS":
      return (
        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
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
      );
    case "RESOLVED":
      return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "CLOSED":
      return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
};

export const EnquiryRow = ({ enquiry }: { enquiry: Enquiry }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-150">
        <td className="px-6 py-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm line-clamp-1">
                {enquiry.subject}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {enquiry.message}
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs">
              {enquiry.user.firstName[0]}
              {enquiry.user.lastName[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {enquiry.user.firstName} {enquiry.user.lastName}
              </p>
              <p className="text-xs text-gray-500">{enquiry.user.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(enquiry.status)}`}
          >
            {getStatusIcon(enquiry.status)}
            {enquiry.status.replace("_", " ")}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
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
            <span className="font-mono text-xs">
              {enquiry.order.id.slice(0, 8)}...
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-600">
            {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {new Date(enquiry.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </button>
        </td>
      </tr>

      <EnquiryDetailsDrawer
        enquiry={enquiry}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
