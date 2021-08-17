import { useState } from "react";
import useAuth from "../../hooks/auth";
import Logo from "../general/Logo";
import Loader from "../general/Loader";
import { useSelector } from "react-redux";
const DashboardLayout = ({ children }) => {
  //useAuth();
  const loading = useSelector((state) => state.dashboard.loading);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center p-5 h-16 mb-3 bg-white">
            <Logo primary />
            <div>Right</div>
          </div>
          <div className="p-5">{children}</div>
        </>
      )}
    </>
  );
};
export default DashboardLayout;
