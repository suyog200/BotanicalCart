import { ShoppingBag } from "lucide-react";

const EmptyOrdersState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          No Orders Yet
        </h2>
        <p className="text-gray-600 mb-8">
          You haven't placed any orders yet. Start shopping to see your orders
          here!
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default EmptyOrdersState;