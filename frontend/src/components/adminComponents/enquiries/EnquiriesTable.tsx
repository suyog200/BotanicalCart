import type { Enquiry } from "./enquiry.types";
import { EnquiryRow } from "./EnquiryRow";

interface Props {
  enquiries: Enquiry[];
  onLoadMore: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export const EnquiriesTable = ({
  enquiries,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: Props) => {
  if (!enquiries.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No enquiries yet
          </h3>
          <p className="text-gray-500 text-sm">
            Customer enquiries will appear here when they submit questions or
            support requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {enquiries.map((enquiry) => (
              <EnquiryRow key={enquiry.id} enquiry={enquiry} />
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoadingMore ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-gray-600"
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
                Loading...
              </>
            ) : (
              <>
                Load More
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
