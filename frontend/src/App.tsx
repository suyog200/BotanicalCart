import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import AboutPage from "./pages/AboutPage";
import { lazy, Suspense } from "react";
const WishlistPage = lazy(() => import("./pages/WishlistPage"));

const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");

  return (
    <div className="bg-(--background)">
      {isSellerPath ? null : <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Main content area */}
      <div className={`${isSellerPath ? "" : "px-2 md:px-6 lg:px-8 xl:px-10"}`}>
        {/* Main content area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignupPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/plantsDetails/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
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
        </Routes>
      </div>
      {/* Footer */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
