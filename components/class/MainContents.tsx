import React, { useState, useEffect } from "react";

import FAB from "./FAB";
import Sidebar from "./Sidebar";
import dateformat from "dateformat";
import Image from "next/image";
import PaymentBox from "./PaymentBox";
import CommentReview from "./CommentReview";
import { CONSTANTS } from "../../utils/constants";
import DisplayImage from "./DisplayImage";
import { IClassData, ITopics } from "../../utils/types";
import ReactVideoPlayer from "../general/ReactVideoPlayer";
import useCanViewTopic from "../../hooks/useCanViewTopic";
import Loader from "../general/Loader";

export interface IMainContents {
  classData: IClassData;
  topicData?: ITopics;
  isTopic?: boolean;
}

const MainContents = ({
  classData,
  topicData = null,
  isTopic = false,
}: IMainContents) => {
  const { canView, loading: loadingCanView } = useCanViewTopic({
    classSlug: classData?.slug || "",
    classPrice: classData?.price || 0,
  });
  const [showMobileTopicsNav, setShowMobileTopicsNav] =
    useState<boolean>(false);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  useEffect(() => {
    setCurrentTopic(topicData?.id || "");
  }, [topicData?.id]);
  return (
    <div className="mt-4 md:mb-8 px-5 md:px-0 w-full text-secondary">
      {classData && classData?.title ? (
        <div className="flex md:space-x-4 transition duration-700">
          <FAB toggle={setShowMobileTopicsNav} show={showMobileTopicsNav} />
          <Sidebar
            current={currentTopic}
            showMobileTopicsNav={showMobileTopicsNav}
            classData={classData}
          />
          <div className="w-full md:w-[65%]">
            <div
              className={`rounded overflow-hidden ${
                isTopic && canView ? "pt-[56.25%]" : ""
              } w-full bg-gray-200 relative h-[30%] sm:h-[35%] md:h-[300px]`}
            >
              {isTopic ? (
                loadingCanView ? (
                  <Loader />
                ) : canView ? (
                  <ReactVideoPlayer url={topicData?.videoLink || ""} />
                ) : (
                  <div className="text-center flex items-center justify-center h-full font-bold text-xl md:text-2xl text-zinc-400">
                    <p>Content Unavailable</p>
                  </div>
                )
              ) : (
                <DisplayImage
                  title={classData?.title}
                  src={classData?.thumbnail}
                />
              )}
            </div>
            <span className="mt-1 text-xs md:text-sm text-gray-400">
              Added on:{" "}
              {dateformat(
                isTopic ? topicData?.createdAt : classData?.createdAt,
                "fullDate"
              )}
            </span>
            <h1 className="mt-2 mb-4 font-bold text-xl md:text-2xl">
              {isTopic
                ? topicData?.title ?? "Unknown"
                : classData?.title ?? "Unknown"}
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
