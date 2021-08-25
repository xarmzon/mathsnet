import Loader from "../general/Loader";
import { useSelector } from "react-redux";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";

const DashboardLayout = ({ children }) => {
  const loading = useSelector((state) => state.dashboard.loading);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-5 mt-5">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loader full={false} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
