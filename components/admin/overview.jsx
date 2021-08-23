import Link from "next/link";
const AdminOverview = () => {
  return (
    <>
      <div>
        Admin Overview
        <Link href="/dashboard/classes"> Classes</Link>
      </div>
    </>
  );
};

export default AdminOverview;
