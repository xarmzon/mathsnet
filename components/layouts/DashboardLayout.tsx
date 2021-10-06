import Loader from "../general/Loader";
import { useAppSelector } from "../../redux/store";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";

const DashboardLayout = ({ children }) => {
  const loading = useAppSelector((state) => state.dashboard.loading);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-5 pl-0 mt-20 w-full ml-12">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loader text="Loading..." full={false} />
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
