import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";

const Classes = () => {
  useUserType();
  return (
    <DashboardLayout>
      <NextSeo title="Classes" nofollow={true} noindex={true} />
      <div>Classes</div>
    </DashboardLayout>
  );
};
export default Classes;
