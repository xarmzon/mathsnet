import { useState } from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import MenuItem from "../dashboard/MenuItem";
const Sidebar = () => {
  const loading = useSelector((state) => state.dashboard.loading);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    // console.log("sidebar");
    setSidebarOpen((prev) => !prev);
  };
  return (
    <aside
      className={`relative h-screen ${
        sidebarOpen ? "w-[140px] md:w-[180px]" : "w-[35px]"
      } transition-all duration-500 bg-white text-primary pt-5 flex flex-col text-lg md:text-2xl shadow md:shadow-lg`}
    >
      <div className="absolute text-sm md:text-lg top-1 -right-5 h-5 w-5 bg-primary text-gray-50 flex items-center justify-center cursor-pointer group">
        {sidebarOpen ? (
          <HiChevronDoubleLeft onClick={handleSidebar} />
        ) : (
          <HiChevronDoubleRight onClick={handleSidebar} />
        )}
      </div>
      <div className="w-full overflow-hidden">{!loading && <MenuItem />}</div>
    </aside>
  );
};

export default Sidebar;
