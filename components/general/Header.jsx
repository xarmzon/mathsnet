import Logo from "./Logo";
import Navbar from "./Navbar";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useState } from "react";
const Header = ({ bg, color }) => {
  const classData = {
    color: color ? color : "text-white",
    bg: bg ? bg : "bg-primary",
  };

  const [navStateOff, setNavStateOff] = useState(true);
  const openMobileNav = () => setNavStateOff((prev) => !prev);
  return (
    <div className={`${classData.bg} ${classData.color} h-[60px]`}>
      <div className="flex justify-between items-center container mx-auto p-5 pt-2">
        <Logo />
        <HiOutlineViewGrid
          className="transform -translate-y-1 md:hidden cursor-pointer"
          onClick={openMobileNav}
        />
        <Navbar navState={navStateOff} />
      </div>
    </div>
  );
};

export default Header;
