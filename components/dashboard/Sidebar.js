import { useRef, useState } from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import useClickOutside from "../../hooks/click-outside";
import MenuItem from "../dashboard/MenuItem";
const Sidebar = () => {
  const loading = useSelector((state) => state.dashboard.loading);
  const sideBarRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const miniSidebar = () => {
    setSidebarOpen((prev) => false);
  };

  //useClickOutside(sideBarRef, () => console.log("click outside"));
  return (
    <>
      <aside
        ref={sideBarRef}
        className={`fixed left-0 top-16 bottom-0 ${
          sidebarOpen
            ? "w-[200px] shadow-xl"
            : "w-[35px] shadow-sm md:shadow-lg"
        } transition-all duration-500 bg-white text-primary pt-5 flex flex-col text-lg md:text-2xl z-10`}
      >
        <div className="absolute text-sm md:text-lg top-1 -right-5 h-5 w-5 bg-primary text-gray-50 flex items-center justify-center cursor-pointer group">
          {sidebarOpen ? (
            <HiChevronDoubleLeft onClick={handleSidebar} />
          ) : (
            <HiChevronDoubleRight onClick={handleSidebar} />
          )}
        </div>
        <div className="w-full overflow-hidden">
          {!loading && <MenuItem miniSidebar={miniSidebar} />}
        </div>
      </aside>
      {/* <div className={`fixed inset-0 bg-gray-100 `}></div> */}
    </>
  );
};

export default Sidebar;
