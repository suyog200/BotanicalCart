import { Clock, Package, TrendingUp, User, Star } from "lucide-react";
import { Suspense, lazy } from "react";
import OverviewCards from "@/components/adminComponents/OverviewCards";
import { useDashboardStats } from "@/hooks/useDashboardStats";

// Lazy load chart components
const MonthlyRevenueChart = lazy(
  () => import("@/components/adminComponents/charts/MontlyRevenueChart"),
);
const OrderStatusChart = lazy(
  () => import("@/components/adminComponents/charts/OrderStatusChart"),
);
const PaymentRevenueChart = lazy(
  () => import("@/components/adminComponents/charts/PaymentRevenueChart"),
);
const TopProductsChart = lazy(
  () => import("@/components/adminComponents/charts/TopProductsChart"),
);
const LowStockWidget = lazy(
  () => import("@/components/adminComponents/charts/LowStockWidget"),
);

// Loading skeleton component
const ChartLoadingSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="h-64 bg-gray-100 rounded"></div>
  </div>
);

const DashboardPage = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (error) {
  return <div className="p-8 text-red-500">Error loading dashboard stats</div>;
}

  // Define cards data with custom icons and colors
  const overviewCards = [
    {
      title: "Total Products",
      value:
        stats.totalProducts && stats.totalProducts > 0
          ? stats.totalProducts
          : "0",
      icon: Package,
      iconClassName: "text-[var(--color-primary)]",
    },
    {
      title: "Pending Orders",
      value:
        stats.pendingOrders && stats.pendingOrders > 0
          ? stats.pendingOrders
          : "0",
      icon: Clock,
      iconClassName: "text-yellow-500",
    },
    {
      title: "Total Customers",
      value: stats.totalUsers && stats.totalUsers > 0 ? stats.totalUsers : "0",
      icon: User,
      iconClassName: "text-green-500",
    },
    {
      title: "Total Orders",
      value:
        stats.totalOrders && stats.totalOrders > 0 ? stats.totalOrders : "0",
      icon: Package,
      iconClassName: "text-[var(--color-primary)]",
    },
    {
      title: "Total Reviews",
      value:
        stats.totalReviews && stats.totalReviews > 0 ? stats.totalReviews : "0",
      icon: Star,
      iconClassName: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: TrendingUp,
      iconClassName: "text-[var(--color-primary)]",
      formatValue: (value: number | string) =>
        `₹${Number(value).toLocaleString()}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--color-hero-text-heading)] mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-[var(--color-hero-text-subtitle)] text-lg">
          Manage your botanical business with ease
        </p>
      </div>

      {/* Stats Cards Container */}
      <OverviewCards cards={overviewCards} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Suspense fallback={<ChartLoadingSkeleton />}>
          <MonthlyRevenueChart />
        </Suspense>
        <Suspense fallback={<ChartLoadingSkeleton />}>
          <OrderStatusChart />
        </Suspense>
        <Suspense fallback={<ChartLoadingSkeleton />}>
          <PaymentRevenueChart />
        </Suspense>
        <Suspense fallback={<ChartLoadingSkeleton />}>
          <TopProductsChart />
        </Suspense>
        <Suspense fallback={<ChartLoadingSkeleton />}>
          <LowStockWidget />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
