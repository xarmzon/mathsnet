import DashboardLayout from "../../components/layouts/DashboardLayout";
import { NextSeo } from "next-seo";
import { isValidUser } from "../../utils/auth";
import { ROUTES } from "../../utils/constants";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/auth";

const Overview = ({ validUser }) => {
  const router = useRouter();
  useAuth();

  return (
    <DashboardLayout>
      <NextSeo title="Overview" nofollow={true} noindex={true} />
      <div>Overview</div>
    </DashboardLayout>
  );
};

export const getServerSideProps = (context) => {
  const validUser = isValidUser(context.req.headers.cookie);

  return {
    props: {
      validUser,
    },
  };
};

export default Overview;
