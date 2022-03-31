import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { getUserID } from "../../utils/auth";
import { CONSTANTS, PER_PAGE, ROUTES } from "../../utils/constants";
import { getClassesData } from "../api/class";
import { getStudentClasses } from "../api/student";
import mongoose from "mongoose";
import { IClassCardProps, IPagingData } from "../../utils/types";
import Pagination from "../../components/general/Pagination";
import LinkButton, { ETypes } from "../../components/general/LinkButton";
import ClassCard from "../../components/class/ClassCard";
import useSWR from "swr";

interface IMyClasses {
  hasData: boolean;
  myClasses: string;
  fallback: any;
}

const MyClasses = ({ hasData, myClasses, fallback }: IMyClasses) => {
  useUserType(CONSTANTS.USER_TYPES.STUDENT);
  const [searchVal, setSearchVal] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: classesData, error: classesDataError } = useSWR(
    `${ROUTES.API.STUDENT}?get_type=myclass&search=${searchVal}&page=${page}`,
    { fallback }
  );

  useEffect(() => {
    console.log(hasData);
    console.log(JSON.parse(myClasses));
    console.log(classesData);
  }, [classesData, hasData, myClasses]);

  const handlePagination = (page: number) => {
    setPage((prev) => page);
  };

  return (
    <DashboardLayout>
      <NextSeo title="My Class" nofollow={true} noindex={true} />
      {hasData ? (
        <div className="w-full">
          {classesData?.results?.length > 0 && (
            <div className="my-4 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {classesData?.results?.map((c, i) => (
                <ClassCard
                  key={i}
                  img={c?.img ?? ""}
                  title={c?.title ?? ""}
                  priceTag={c?.priceTag ?? ""}
                  desc={c?.desc ?? ""}
                  topicsCount={c?.topicsCount ?? 0}
                  slug={c?.slug ?? "/"}
                  addedOn={c?.addedOn ?? ""}
                />
              ))}
            </div>
          )}
          <div className="w-full mt-5 mb-12 flex items-center justify-center">
            <Pagination
              showCount={true}
              onClick={(page: number) => handlePagination(page)}
              totalPage={classesData?.paging?.totalPages ?? 1}
            />
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[300px] flex-col space-y-6 font-bold flex items-center justify-center text-slate-600 text-center">
          <p>You don&apos;t have any class yet.</p>
          <LinkButton
            txt="You can do so here"
            type={ETypes.ASCENT}
            href={ROUTES.GENERAL.CLASSES}
            rounded
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyClasses;

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  let myClasses: IPagingData<IClassCardProps> = null;
  let hasData = false;

  const userId = getUserID(cookies);
  if (userId.length > 0) {
    try {
      const options = {
        match: { student: mongoose.Types.ObjectId(userId) },
      };
      myClasses = await getStudentClasses(0, PER_PAGE, options);
      if (myClasses?.results?.length > 0) hasData = true;
    } catch (e) {}
  }

  const key = `${ROUTES.API.STUDENT}?get_type=myclass&search=""&page=1`;
  return {
    props: {
      myClasses: JSON.stringify(myClasses || ""),
      hasData,
      fallback: {
        [key]: JSON.stringify(myClasses || ""),
      },
    },
  };
};
