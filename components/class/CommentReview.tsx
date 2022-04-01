import React, { useState } from "react";
import { FiBook, FiMessageCircle } from "react-icons/fi";
import { IClassData, ITopics } from "../../utils/types";

export interface ICommentReview {
  classData: IClassData;
  isTopic: boolean;
  topicData: ITopics;
}

const CommentReview = ({ classData, isTopic, topicData }: ICommentReview) => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <div className="mt-4 w-full">
      <div className="flex w-full overflow-x-auto space-x-5 md:space-x-7 min-h-[10px] border-b-2 border-gray-200">
        <div
          onClick={() => setCurrentTab(1)}
          className={`${
            currentTab === 1
              ? "border-b border-primary text-primary"
              : "border-0 text-secondary"
          } flex items-center space-x-1 cursor-pointer`}
        >
          <FiBook />
          <span className="">Description</span>
        </div>
        <div
          onClick={() => setCurrentTab(2)}
          className={`${
            currentTab === 2
              ? "border-b border-primary text-primary"
              : "border-0 text-secondary"
          } flex items-center space-x-1 cursor-pointer`}
        >
          <FiMessageCircle />
          <span className="">Reviews</span>
        </div>
      </div>
      <div className="pt-3 mb-5 h-[300px] md:h-[380px] overflow-y-hidden">
        <div
          className={`${
            currentTab === 1
              ? "block w-full h-full overflow-y-auto scrollbar scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300 pr-5"
              : "hidden"
          }`}
        >
          {(isTopic && topicData.description) || classData.desc ? (
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: isTopic ? topicData.description : classData.desc,
              }}
            ></div>
          ) : (
            <p>No Description</p>
          )}
        </div>
        <div
          className={`${
            currentTab === 2
              ? "block w-full h-full overflow-y-auto scrollbar scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300 pr-5"
              : "hidden"
          }`}
        >
          Reviews Tab
        </div>
      </div>
    </div>
  );
};

export default CommentReview;
