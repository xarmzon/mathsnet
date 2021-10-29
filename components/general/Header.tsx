import Logo from "./Logo";
import Navbar from "./Navbar";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useState } from "react";
const Header = ({ type = "primary", fixed = false }) => {
  const classData = {
    color: type === "primary" ? "text-white" : "text-primary",
    bg: type === "primary" ? "bg-primary" : "bg-gray-50",
  };
  const logoType = () => (type === "primary" ? "trans" : "primary");

  const [navStateOff, setNavStateOff] = useState(true);
  const openMobileNav = () => setNavStateOff((prev) => !prev);
  return (
    <div
      className={`${fixed && "fixed top-0 left-0 right-0"} ${classData.bg} ${
        classData.color
      } h-[60px] z-50`}
    >
      <div className="flex justify-between items-center container mx-auto p-5 pt-3">
        <Logo type={logoType()} />
        <HiOutlineViewGrid
          className="text-xl transform -translate-y-1 md:hidden cursor-pointer"
          onClick={openMobileNav}
        />
        <Navbar color={type} navState={navStateOff} />
      </div>
    </div>
  );
};

export default Header;
