import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";

const Instructors = () => {
  useUserType();
  return (
    <DashboardLayout>
      <NextSeo title="Instructors" nofollow={true} noindex={true} />
      <div>Instructors</div>
    </DashboardLayout>
  );
};
export default Instructors;
