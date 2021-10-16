import Link from "next/link";
import { ROUTES } from "../../utils/constants";
import BoardCard from "../dashboard/BoardCard";
import DataProfileView from "../dashboard/DataProfileView";
import { HiUsers, HiUserGroup ,HiBookOpen } from "react-icons/hi";

const AdminOverview = () => {
  return (
    <>
      <DataProfileView>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5 gap-5">
          <h4 className="text-primary font-bold text-lg">Overview</h4>
          <BoardCard text="Students" count={555} icon={<HiUserGroup />} />
          <BoardCard text="Classes" count={59} icon={<HiBookOpen />} />
          <BoardCard text="Instructors" count={5} color="white" icon={<HiUsers />}/>
        </section>
      </DataProfileView>
    </>
  );
};

export default AdminOverview;
