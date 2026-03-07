interface Props {
  totalOrders: number;
  displayedCount: number;
}

export const OrdersStats = ({ totalOrders, displayedCount }: Props) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-primary">{totalOrders}</p>
          {displayedCount < totalOrders && (
            <p className="text-xs text-gray-500 mt-1">
              Showing {displayedCount} of {totalOrders}
            </p>
          )}
        </div>
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
