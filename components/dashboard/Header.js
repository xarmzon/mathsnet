import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import Logo from "../general/Logo";

const Header = () => {
  const loading = useSelector((state) => state.dashboard.loading);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center p-5 h-16 bg-white shadow-sm md:shadow-md sticky top-0 w-screen">
      <Logo type="primary" />
      <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-100 text-primary ring-1 ring-primary-100 font-light text-lg cursor-pointer">
        {loading ? (
          <HiOutlineUserCircle className="text-xl font-thin" />
        ) : (
          user.fullName.charAt(0).toUpperCase()
        )}
      </div>
    </div>
  );
};

export default Header;
