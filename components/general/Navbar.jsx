import Link from "next/link";
import LinkButton from "./LinkButton";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { addUser, setLoginState } from "../../redux/slice/auth";
import { ROUTES } from "../../utils/constants";

const linkColor = (type) => (type === "primary" ? "primary" : "white");
const AuthButtons = () => (
  <>
    <LinkButton
      href="/auth/signup"
      txt="Signup"
      py="py-1"
      rounded
      type="outline"
    />
    <LinkButton href="/auth/login" txt="Login" py="py-1" rounded />
  </>
);

const UserMenu = ({ type }) => {
  const [_, _c, removeCookie] = useCookies(["token"]);
  const [logoutText, setLogoutText] = useState("Logout");
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = () => {
    if (logoutText !== "Loading") {
      setLogoutText("Loading");
      setTimeout(() => {
        removeCookie("token", { path: "/" });
        dispatch(addUser({}));
        dispatch(setLoginState(false));
        localStorage.removeItem("user");
        //setLogoutText("Logout");
        router.push("/");
      }, 1000);
    } else {
      return;
    }
  };

  return (
    <>
      <LinkButton
        color={linkColor(type)}
        href={ROUTES.GENERAL.OVERVIEW}
        txt="Dashboard"
        type="text"
      />
      <button
        onClick={logout}
        className="px-4 py-1 bg-ascent-light text-primary"
      >
        {logoutText}
      </button>
    </>
  );
};
const Navbar = ({ navState, color }) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const isLoading = useSelector((state) => state.auth.loading);
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
      className={`fixed w-full ${
        mobileNavOff ? "-top-full" : "top-0"
      } left-0 transition-all duration-500 z-50 md:z-auto  pt-6 ${
        color === "primary" ? "bg-primary" : "bg-gray-50"
      } pb-10 shadow-sm md:shadow-none md:pb-0 md:bg-transparent md:relative md:pt-0 md:w-auto`}
    >
      <div className="flex flex-col items-center space-y-5 md:flex-row md:space-x-4 relative md:space-y-0">
        <FaTimes
          className={`absolute -top-1 right-7 cursor-pointer md:hidden ${
            color === "primary" ? "text-white" : "text-primary"
          }`}
          onClick={closeMobileNav}
        />
        <div className="absolute -top-7 left-4 mt-0 md:hidden">
          <Logo type={`${color === "primary" ? "trans" : "primary"}`} />
        </div>
        <LinkButton
          color={linkColor(color)}
          href={ROUTES.GENERAL.CLASSES}
          txt="Classes"
          type="text"
        />
        {!isLoading &&
          (isLoggedIn ? (
            <UserMenu type={color} />
          ) : (
            <AuthButtons type={color} />
          ))}
      </div>
    </div>
  );
};

export default Navbar;
