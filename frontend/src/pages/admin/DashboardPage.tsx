import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Package, TrendingUp } from "lucide-react";
import OverviewCards from "@/components/adminComponents/OverviewCards";

const DashboardPage = () => {
  // Mock data - replace with real data from your API
  const stats = {
    totalProducts: 156,
    pendingOrders: 23,
    newEnquiries: 8,
    totalRevenue: 45670,
  };

  // Define cards data with custom icons and colors
  const overviewCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconClassName: "text-[var(--color-primary)]",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      iconClassName: "text-yellow-500",
    },
    {
      title: "New Enquiries",
      value: stats.newEnquiries,
      icon: MessageSquare,
      iconClassName: "text-blue-500",
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

  const recentProducts = [
    {
      id: "1",
      name: "Monstera Deliciosa",
      image: "/src/assets/monstera.jpg",
      price: 299,
      uploadedAt: "2 hours ago",
      category: "Indoor",
    },
    {
      id: "2",
      name: "Snake Plant",
      image: "/src/assets/snake-plant.jpg",
      price: 199,
      uploadedAt: "5 hours ago",
      category: "Indoor",
    },
    {
      id: "3",
      name: "Peace Lily",
      image: "/src/assets/featuredImg/peacelily.jpg",
      price: 149,
      uploadedAt: "1 day ago",
      category: "Indoor",
    },
  ];

  const recentInquiries = [
    {
      id: "1",
      customer: "Sarah Johnson",
      message: "Do you have bulk discounts for office plants?",
      time: "30 minutes ago",
      status: "new",
    },
    {
      id: "2",
      customer: "Mike Chen",
      message: "What's the care instructions for fiddle leaf fig?",
      time: "2 hours ago",
      status: "replied",
    },
    {
      id: "3",
      customer: "Emma Wilson",
      message: "Can I get a custom plant arrangement for my wedding?",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: "4",
      customer: "David Brown",
      message: "Issues with my recent order delivery",
      time: "6 hours ago",
      status: "urgent",
    },
  ];

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "replied":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "urgent":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products Section */}
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-[var(--color-hero-text-heading)] flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--color-hero-text-heading)]">
                    {product.name}
                  </h4>
                  <p className="text-sm text-[var(--color-hero-text-subtitle)]">
                    ₹{product.price}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="secondary"
                    className="bg-[var(--color-primary)] text-white text-xs"
                  >
                    {product.category}
                  </Badge>
                  <p className="text-xs text-[var(--color-hero-text-subtitle)] mt-1">
                    {product.uploadedAt}
                  </p>
                </div>
              </div>
            ))}
            <button className="w-full p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors rounded-lg border border-[var(--color-primary)]">
              View All Products
            </button>
          </CardContent>
        </Card>

        {/* Inquiries Section */}
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-[var(--color-hero-text-heading)] flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[var(--color-hero-text-heading)]">
                      {inquiry.customer}
                    </h4>
                    <div
                      className={`w-2 h-2 rounded-full ${getInquiryStatusColor(
                        inquiry.status
                      )}`}
                    ></div>
                  </div>
                  <span className="text-xs text-[var(--color-hero-text-subtitle)]">
                    {inquiry.time}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-hero-text-subtitle)] mb-2">
                  {inquiry.message}
                </p>
                <Badge
                  variant="secondary"
                  className={`text-xs ${getInquiryStatusColor(
                    inquiry.status
                  )} text-white`}
                >
                  {inquiry.status.charAt(0).toUpperCase() +
                    inquiry.status.slice(1)}
                </Badge>
              </div>
            ))}
            <button className="w-full p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors rounded-lg border border-[var(--color-primary)]">
              View All Inquiries
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
