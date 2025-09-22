import { Button } from "@/components/ui/button";


const AdminDashboard = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/overview" },
    { name: "+ Category", path: "/chat" },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <h1 className="text-2xl font-semibold text-gray-700">
          Botanical Cart Admin Dashboard
        </h1>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <Button variant="outline" size="sm">Logout</Button>
        </div>
      </div>
      <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
        {sidebarLinks.map((item, index) => (
          <a
            href={item.path}
            key={index}
            className={`flex items-center py-3 px-4 gap-3 
                            ${
                              index === 0
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
          >
            <p className="md:block hidden text-center">{item.name}</p>
          </a>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
