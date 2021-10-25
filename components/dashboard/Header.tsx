import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { addUser, setLoginState, setLoading } from "../../redux/slice/auth";
import Logo from "../general/Logo";

const Header = () => {
  const loading = useAppSelector((state) => state.dashboard.loading);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [_, _c, removeCookie] = useCookies(["token"]);

  const [userNavOpen, setUserNavOpen] = useState(false);
  const [logoutText, setLogoutText] = useState("Logout");

  const logout = () => {
    if (logoutText !== "Loading") {
      setLogoutText("Loading");
      dispatch(setLoading(true));
      removeCookie("token", { path: "/" });
      dispatch(addUser({}));
      dispatch(setLoginState(false));
      localStorage.removeItem("user");
      setTimeout(() => {
        router.push("/");
        //setLogoutText("Logout");
      }, 1000);
    } else {
      return;
    }
  };

  const handleUserNav = () => {
    setUserNavOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-5 h-16 bg-white shadow-sm md:shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <Logo type="primary" />
      <div
        onClick={handleUserNav}
        className="relative h-8 w-8 flex justify-center items-center rounded-full bg-gray-100 text-primary ring-1 ring-primary-100 font-light text-lg cursor-pointer transition-all duration-700"
      >
        {loading ? (
          <HiOutlineUserCircle className="text-lg font-thin" />
        ) : user?.dpUrl ? (
          <div className="w-full h-full rounded-full overflow-hidden">
            <img src={user?.dpUrl} className="object-cover h-full w-full" />
          </div>
        ) : (
          user?.fullName?.charAt(0)?.toUpperCase()
        )}
        <div
          className={`absolute ${
            userNavOpen ? "opacity-100 visible" : "opacity-0 hidden"
          } top-9 right-2 min-w-max max-w-sm rounded-sm shadow-md bg-gray-50 text-sm min-h-[50px] p-4 transition-all duration-700`}
        >
          <ul className="divide-y-2 divide-gray-200 space-y-4 transition-all duration-700">
            <li>
              Signed in as
              <br />
              <span className="inline-block font-semibold text-sm">
                {!loading && user?.username}
              </span>
            </li>
            <li
              className="mt-3 text-center bg-ascent-light text-primary py-1 hover:bg-primary hover:text-ascent-light-100 rounded-sm"
              onClick={logout}
            >
              {logoutText}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
