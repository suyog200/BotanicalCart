import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import { useApiWithAuth } from "./hooks/useApiWithAuth";

// Always loaded (critical path)
import Home from "./pages/customer/Home";
import SignupPage from "./pages/customer/SignupPage";
import SignInPage from "./pages/customer/SignInPage";

// Lazy loaded - customer pages
const Cart = lazy(() => import("./pages/customer/Cart"));
const ProductDetails = lazy(() => import("./pages/customer/ProductDetails"));
const AboutPage = lazy(() => import("./pages/customer/AboutPage"));
const SearchResults = lazy(() => import("./pages/customer/SearchResults"));
const CheckoutPage = lazy(() => import("./pages/customer/CheckoutPage"));
const OrdersPage = lazy(() => import("./pages/customer/OrdersPage"));
const OrderEnquiryPage = lazy(() => import("./pages/customer/OrderEnquiryPage"));
const ProductsPage = lazy(() => import("./pages/customer/ProductsPage"));
const PaymentSuccess = lazy(() => import("./pages/customer/PaymentSucess"));
const PaymentCancel = lazy(() => import("./pages/customer/PaymentCancel"));
const WishlistPage = lazy(() => import("./pages/customer/WishlistPage"));

// Lazy loaded - admin pages (heaviest, definitely lazy load)
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProductsPage"));
const CategoryPage = lazy(() => import("./pages/admin/CategoryPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const OrderAndEnquiries = lazy(() => import("./pages/admin/OrderAndEnquiries"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));

const PageLoader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const isSellerPath = useLocation().pathname.includes("/admin");
  useApiWithAuth();

  return (
    <div className="bg-(--background) flex flex-col min-h-screen">
      {isSellerPath ? null : <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`flex-1 ${isSellerPath ? "" : "px-2 md:px-6 lg:px-8 xl:px-10"}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignupPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/plants-details/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
            <Route path="/orders/:orderId/enquire" element={<OrderEnquiryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "seller"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="orders" element={<OrderAndEnquiries />} />
              <Route path="settings" element={<Settings />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;