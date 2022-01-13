import React, { useState } from "react";
import { FiBook, FiMessageCircle } from "react-icons/fi";
import { IClassData } from "../../pages/[class_slug]";

export interface ICommentReview {
  classData: IClassData;
}

const CommentReview = ({ classData }: ICommentReview) => {
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
      <div className="pt-3 mb-3">
        <div className={`${currentTab === 1 ? "block w-full" : "hidden"}`}>
          {classData.desc ? (
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: classData.desc }}
            ></div>
          ) : (
            <p>No Description</p>
          )}
        </div>
        <div className={`${currentTab === 2 ? "block w-full" : "hidden"}`}>
          Reviews Tab
        </div>
      </div>
    </div>
  );
};

export default CommentReview;
