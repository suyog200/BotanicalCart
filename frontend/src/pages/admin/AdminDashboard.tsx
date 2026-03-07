import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { House } from "lucide-react";
import { Image } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { Calendar } from "lucide-react";
import { ChartLine } from "lucide-react";
import { Settings } from "lucide-react";
import { ColorfulTextHeader } from "@/components/ColorfulTextHeader";

const AdminDashboard = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <House size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Image size={20} />,
    },
    {
      name: "Category",
      path: "/admin/category",
      icon: <SquarePlus size={20} />,
    },
    {
      name: "Orders & Enquiries",
      path: "/admin/orders",
      icon: <Calendar size={20} />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <ChartLine size={20} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  const location = useLocation();

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white flex-shrink-0">
        <ColorfulTextHeader
          text1=""
          featuredText="Botanical Cart"
          text2=""
          className="text-2xl md:text-xl lg:text-2xl font-bold text-center text-black relative z-2 font-sans"
        />
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col flex-shrink-0 bg-white">
          {sidebarLinks.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center py-3 px-4 gap-3 transition
                  ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-green-500/10 border-green-600 text-green-500"
                      : "hover:bg-gray-100/90 border-white text-gray-700"
                  }`}
              >
                {item.icon}
                <p className="md:block hidden">{item.name}</p>
              </Link>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
