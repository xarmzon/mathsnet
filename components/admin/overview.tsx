import Link from "next/link";
import { ROUTES } from "../../utils/constants";
import DataProfileView from "../dashboard/DataProfileView";
const AdminOverview = () => {
  return (
    <>
      <DataProfileView>Admin Overview</DataProfileView>
    </>
  );
};

export default AdminOverview;
