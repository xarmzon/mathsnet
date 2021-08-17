import useAuth from "../../hooks/auth";
import Logo from "../general/Logo";

const DashboardLayout = ({ children }) => {
  //useAuth();
  return (
    <>
      <div className="flex justify-between items-center p-5 h-16 mb-3 bg-white">
        <Logo primary />
        <div>Right</div>
      </div>
      <div className="p-5">{children}</div>
    </>
  );
};
export default DashboardLayout;
