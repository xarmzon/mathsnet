import DashboardLayout from "../../components/layouts/DashboardLayout";
import { NextSeo } from "next-seo";
import { isValidUser } from "../../utils/auth";
import { CONSTANTS, ROUTES } from "../../utils/constants";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import AdminOverview from "../../components/admin/overview";
import StudentOverview from "../../components/student/overview";
import InstructorOverview from "../../components/Instructor/Overview";

const Overview = () => {
  const router = useRouter();
  useAuth();

  const user = useSelector((state) => state.auth.user);
  //console.log(user);
  return (
    <DashboardLayout>
      <NextSeo title="Overview" nofollow={true} noindex={true} />
      <div>
        {user &&
          (user.userType === CONSTANTS.USER_TYPES.ADMIN ? (
            <AdminOverview />
          ) : user.userType === CONSTANTS.USER_TYPES.INSTRUCTOR ? (
            <InstructorOverview />
          ) : (
            <StudentOverview />
          ))}
      </div>
    </DashboardLayout>
  );
};

// export const getServerSideProps = (context) => {
//   const validUser = isValidUser(context.req.headers.cookie);

//   return {
//     props: {
//       validUser,
//     },
//   };
// };

export default Overview;
