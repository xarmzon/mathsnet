import React, { useState } from "react";
import { IClassData } from "../../pages/[class_slug]";
import FAB from "./FAB";
import Sidebar from "./Sidebar";
import dateformat from "dateformat";
import Image from "next/image";
import PaymentBox from "./PaymentBox";
import CommentReview from "./CommentReview";
import { CONSTANTS } from "../../utils/constants";
import DisplayImage from "./DisplayImage";

export interface IMainContents {
  classData: IClassData;
  children?: React.ReactNode;
  currentTopic?: string;
}

const MainContents = ({ classData, children, currentTopic }: IMainContents) => {
  const [showMobileTopicsNav, setShowMobileTopicsNav] =
    useState<boolean>(false);
  return (
    <div className="mt-4 md:mb-8 px-5 md:px-0 w-full text-secondary">
      {classData && classData.title ? (
        <div className="flex md:space-x-4 transition duration-700">
          <FAB toggle={setShowMobileTopicsNav} show={showMobileTopicsNav} />
          <Sidebar
            current={currentTopic}
            showMobileTopicsNav={showMobileTopicsNav}
            classData={classData}
          />
          <div className="w-full md:w-[65%] ">
            {children ? (
              { children }
            ) : (
              <div className="w-full relative h-[30%] sm:h-[35%] md:h-[300px]">
                <DisplayImage
                  title={classData.title}
                  src={classData.thumbnail}
                />
              </div>
            )}
            <span className="mt-1 text-xs md:text-sm text-gray-400">
              Added on: {dateformat(classData.createdAt, "fullDate")}
            </span>
            <h1 className="mt-2 mb-4 font-bold text-xl md:text-2xl">
              {classData.title || "Unknown"}
            </h1>
            <PaymentBox classData={classData} />
            <CommentReview classData={classData} />
          </div>
        </div>
      ) : (
        <div className="md:max-w-screen-md md:mx-auto p-5">
          <p className="text-red-600 text-2xl text-center">
            {CONSTANTS.MESSAGES.COURSE_NOT_FOUND}
          </p>
        </div>
      )}
    </div>
  );
};

export default MainContents;
