import { useState } from "react";
import useAuth from "../../hooks/auth";
import Logo from "../general/Logo";
import Loader from "../general/Loader";
import { useSelector } from "react-redux";
const DashboardLayout = ({ children }) => {
  //useAuth();
  const loading = useSelector((state) => state.dashboard.loading);
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center p-5 h-16 mb-3 bg-white">
            <Logo type="primary" />
            <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-100 text-primary ring-1 ring-primary-100 font-bold text-lg cursor-pointer">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="p-5">{children}</div>
        </>
      )}
    </>
  );
};
export default DashboardLayout;
