import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useAdmin } from "../../hooks/auth";

const Classes = () => {
  useAdmin();
  return (
    <DashboardLayout>
      <NextSeo title="Classes" nofollow={true} noindex={true} />
      <div>Classes</div>
    </DashboardLayout>
  );
};
export default Classes;
