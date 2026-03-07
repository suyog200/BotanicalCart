import { XCircle } from "lucide-react";

const ErrorState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Failed to Load Orders
      </h2>
      <p className="text-gray-600 mb-6">
        An error occurred while fetching your orders
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;