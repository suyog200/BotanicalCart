import Navbar from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";


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
        </Routes>
      </div>
    </div>
  )
}

export default App
