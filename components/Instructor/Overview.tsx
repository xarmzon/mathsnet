import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import BoardCard from "../dashboard/BoardCard";
import DataProfileView from "../dashboard/DataProfileView";
import { HiUsers, HiUserGroup, HiBookOpen } from "react-icons/hi";
import useSWR, { useSWRConfig } from "swr";

const InstructorOverview = () => {
  const { mutate } = useSWRConfig();
  const { data: overviewData, error: overviewDataError } = useSWR(
    `${ROUTES.API.OVERVIEW}?get_type=user`
  );
  const [loading, setLoading] = useState<boolean>(() =>
    !overviewData && !overviewDataError ? true : false
  );
  useEffect(() => {
    if (!overviewData && !overviewDataError) setLoading(true);
    else setLoading(false);
  }, [overviewData, overviewDataError]);
  if (overviewData) console.log(overviewData);
  return (
    <>
      <DataProfileView>
        {overviewDataError && !overviewData && (
          <p
            onClick={() => mutate(`${ROUTES.API.OVERVIEW}?get_type=user`)}
            className="text-center text-red-700 cursor-pointer underline w-[85%] md:w-[75%] mx-auto my-4"
          >
            {CONSTANTS.MESSAGES.FETCH_LOADING_ERROR2}
          </p>
        )}
        <h4 className="mb-4 text-primary font-bold text-lg">Overview</h4>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5 gap-5">
          <BoardCard
            loading={loading}
            text="Students"
            count={overviewData?.totalStudents || 0}
            icon={<HiUserGroup />}
          />
          <BoardCard
            loading={loading}
            text="Topics"
            count={overviewData?.totalTopics || 0}
            icon={<HiBookOpen />}
          />
        </section>
      </DataProfileView>
    </>
  );
};

export default InstructorOverview;
