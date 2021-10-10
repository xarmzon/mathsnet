import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { CONSTANTS } from "../../utils/constants";

const MyClass = () => {
  useUserType(CONSTANTS.USER_TYPES.STUDENT);
  return (
    <DashboardLayout>
      <NextSeo title="My Class" nofollow={true} noindex={true} />
      Student Class
    </DashboardLayout>
  );
};

export default MyClass;
