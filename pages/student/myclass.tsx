import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { useUserID } from "../../utils/auth";
import { CONSTANTS, PER_PAGE, ROUTES } from "../../utils/constants";
import { getClassesData } from "../api/class";
import { getStudentClasses } from "../api/student";
import mongoose from "mongoose";
import { IClassCardProps, IPagingData } from "../../utils/types";
import Pagination from "../../components/general/Pagination";
import LinkButton, { ETypes } from "../../components/general/LinkButton";
import ClassCard from "../../components/class/ClassCard";

interface IMyClasses {
  hasData: boolean;
  myClasses: string;
}

const MyClasses = ({ hasData, myClasses }: IMyClasses) => {
  useUserType(CONSTANTS.USER_TYPES.STUDENT);
  const [classesData, setClassesData] = useState<IPagingData<IClassCardProps>>(
    () => {
      const data = JSON.parse(myClasses);
      if (!hasData)
        return {
          results: [],
          paging: {
            page: 1,
            perPage: PER_PAGE,
            totalItems: 0,
            totalPages: 1,
          },
        };
      const results = data?.results?.map((d: any) => ({
        img: d?.classData?.thumbnail,
        addedOn: d?.createdAt,
        topicsCount: d?.topics?.length,
        priceTag: d?.classData?.price,
        title: d?.classData?.title,
        desc: d?.classData?.shortDesc,
        slug: d?.classData?.slug,
      }));

      return {
        results,
        paging: data?.paging,
      };
    }
  );
  useEffect(() => {
    console.log(hasData);
    console.log(JSON.parse(myClasses));
    console.log(classesData);
  }, [classesData]);

  const handlePagination = (page) => {};

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
          <p>You don't have any class yet.</p>
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
  let myClasses: any = null;
  let hasData = false;

  const userId = useUserID(cookies);
  if (userId.length > 0) {
    try {
      const options = {
        match: { student: mongoose.Types.ObjectId(userId) },
      };
      myClasses = await getStudentClasses(0, PER_PAGE, options);
      if (myClasses?.results?.length > 0) hasData = true;
    } catch (e) {}
  }

  return {
    props: {
      myClasses: JSON.stringify(myClasses || ""),
      hasData,
    },
  };
};
