import Link from "next/link";
import LinkButton from "./LinkButton";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "./Logo";
const Navbar = ({ navState }) => {
  const [mobileNavOff, setMobileNavOff] = useState((state) =>
    navState ? navState : true
  );
  useEffect(() => {
    setMobileNavOff((prev) => !prev);
  }, [navState]);
  useEffect(() => {
    return setMobileNavOff((prev) => true);
  }, []);
  const closeMobileNav = () => setMobileNavOff((prevState) => !prevState);
  return (
    <div
      className={`absolute w-full ${
        mobileNavOff ? "-top-full" : "top-0"
      } left-0 transition-all duration-500  pt-6 bg-primary pb-10 md:pb-0 md:bg-transparent md:relative md:pt-0 md:w-auto`}
    >
      <div className="flex flex-col items-center space-y-5 md:flex-row md:space-x-4 relative md:space-y-0">
        <FaTimes
          className="absolute -top-1 right-7 cursor-pointer md:hidden"
          onClick={closeMobileNav}
        />
        <div className="absolute -top-7 left-4 mt-0 md:hidden">
          <Logo />
        </div>
        <LinkButton href="/learn/classes" txt="Classes" type="text" />
        <LinkButton
          href="/auth/signup"
          txt="Signup"
          py="py-1"
          rounded
          type="outline"
        />
        <LinkButton href="/auth/login" txt="Login" py="py-1" rounded />
      </div>
    </div>
  );
};

export default Navbar;
