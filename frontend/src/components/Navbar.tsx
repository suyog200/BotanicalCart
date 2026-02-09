import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import ShinyButton from "./ui/shinyButton";
import SearchBar from "./SearchBar";
import { ColorfulTextHeader } from "./ColorfulTextHeader";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { navigate, itemCount } = useAppContext();

  const role = user?.publicMetadata.role;

  const isAdmin = role === "admin";
  const isSeller = role === "seller" || role === "admin";

  const closeAll = () => {
    setOpen(false);
    setSearchOpen(false);
  };

  return (
    <nav className="z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2 bg-white/70 transition-all sticky top-0 backdrop-blur-sm">
      <NavLink to="/" className="text-lg font-semibold" onClick={closeAll}>
        <ColorfulTextHeader
          text1=""
          featuredText="Botanical Cart"
          text2=""
          className="text-2xl md:text-xl lg:text-2xl font-bold text-center text-black relative z-2 font-sans"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="hover:text-primary-dull">
          Home
        </NavLink>
        <NavLink to="/about" className="hover:text-primary-dull">
          About
        </NavLink>
        {isAdmin && isSignedIn && (
          <>
        <NavLink to="/orders" className="hover:text-primary-dull">
          Orders
        </NavLink>
        <NavLink to="/wishlist" className="hover:text-primary-dull">
          Wishlist
        </NavLink>
          </>
        )}
        {isAdmin && isSignedIn && (
          <Link to="/admin/dashboard" className="hover:text-primary-dull" target="_blank">
            Dashboard
          </Link>
        )}
        <SearchBar />
        <div
          className="relative cursor-pointer"
          onClick={() => navigate?.("/cart")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#1f9350"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
            {itemCount}
          </button>
        </div>

        {!user ? (
          <ShinyButton
            text="Login"
            onClick={() => {
              navigate?.("/sign-in");
            }}
          />
        ) : (
          <div className="relative group">
            <UserButton />
          </div>
        )}
      </div>

      {/* Mobile Actions */}
      <div className="flex items-center gap-4 sm:hidden">
        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search"
          className="p-1"
        >
          {searchOpen ? (
            <X size={20} className="text-gray-600" />
          ) : (
            <Search size={20} className="text-gray-600" />
          )}
        </button>

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate?.("/cart")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#1f9350"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
            {itemCount}
          </button>
        </div>

        {/* Menu Button */}
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-md p-4 sm:hidden z-50 border-t">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-full left-0 w-full bg-white/95 shadow-md py-4 flex-col items-start gap-2 px-5 text-sm sm:hidden backdrop-blur-sm transition-all border-t z-40`}
        >
          <NavLink
            to="/"
            className="block py-2 hover:text-primary-dull w-full"
            onClick={closeAll}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 hover:text-primary-dull w-full"
            onClick={closeAll}
          >
            About
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/orders"
                className="block py-2 hover:text-primary-dull w-full"
                onClick={closeAll}
              >
                Orders
              </NavLink>
              <NavLink
                to="/wishlist"
                className="block py-2 hover:text-primary-dull w-full"
                onClick={closeAll}
              >
                Wishlist
              </NavLink>
            </>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 my-2"></div>

          {!user ? (
            <button
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={() => {
                closeAll();
                navigate?.("/sign-in");
              }}
            >
              Login
            </button>
          ) : (
            <div className="py-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "ring-1 ring-gray-300 rounded-full",
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
