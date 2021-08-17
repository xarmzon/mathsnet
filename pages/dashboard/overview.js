import DashboardLayout from "../../components/layouts/DashboardLayout";
import { NextSeo } from "next-seo";
import { isValidUser } from "../../utils/auth";
import { ROUTES } from "../../utils/constants";
import { useRouter } from "next/router";
const Overview = ({ validUser }) => {
  const router = useRouter();
  if (!validUser) {
    router.replace(ROUTES.AUTH.LOGIN);
  }
  return (
    <DashboardLayout>
      <NextSeo title="Overview" nofollow={true} noindex={true} />
      <div>Overview</div>
    </DashboardLayout>
  );
};
Overview.auth = true;
export default Overview;

export const getServerSideProps = (context) => {
  const validUser = isValidUser(context.req.headers.cookie);

  return {
    props: {
      validUser,
    },
  };
};
