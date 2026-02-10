import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/customer/Home";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import SignupPage from "./pages/customer/SignupPage";
import SignInPage from "./pages/customer/SignInPage";
import Cart from "./pages/customer/Cart";
import ProductDetails from "./pages/customer/ProductDetails";
import AboutPage from "./pages/customer/AboutPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import CategoryPage from "./pages/admin/CategoryPage";
import DashboardPage from "./pages/admin/DashboardPage";
import OrderAndEnquiries from "./pages/admin/OrderAndEnquiries";
import Settings from "./pages/admin/Settings";
import Analytics from "./pages/admin/Analytics";
import SearchResults from "./pages/customer/SearchResults";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrdersPage from "./pages/customer/OrdersPage";
import OrderEnquiryPage from "./pages/customer/OrderEnquiryPage";
import ProductsPage from "./pages/customer/ProductsPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { lazy, Suspense } from "react";
const WishlistPage = lazy(() => import("./pages/customer/WishlistPage"));

const App = () => {
  const isSellerPath = useLocation().pathname.includes("/admin");

  return (
    <div className="bg-(--background) flex flex-col min-h-screen">
      {isSellerPath ? null : <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Main content area */}
      <div
        className={`flex-1 ${isSellerPath ? "" : "px-2 md:px-6 lg:px-8 xl:px-10"}`}
      >
        {/* Main content area */}
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
          <Route
            path="/orders/:orderId/enquire"
            element={<OrderEnquiryPage />}
          />
          <Route
            path="/wishlist"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center py-10">
                    Loading...
                  </div>
                }
              >
                <WishlistPage />
              </Suspense>
            }
          />
          {/* admin routes (nested inside AdminDashboard) */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin","seller"]}><AdminDashboard /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} /> {/* default */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="orders" element={<OrderAndEnquiries />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </div>
      {/* Footer */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
