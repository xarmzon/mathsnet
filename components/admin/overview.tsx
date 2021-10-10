import Link from "next/link";
import {ROUTES} from "../../utils/constants"
const AdminOverview = () => {
  return (
    <>
      <div>
        Admin Overview
        <Link href={ROUTES.ADMIN.CLASSES}> Classes</Link>
      </div>
    </>
  );
};

export default AdminOverview;
