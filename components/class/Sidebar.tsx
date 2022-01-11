import React from "react";
import Link from "next/link";
import { IClassData } from "../../pages/[class_slug]";

export interface ISidebar {
  showMobileTopicsNav: boolean;
  classData: IClassData;
}

const Sidebar = ({ showMobileTopicsNav, classData }: ISidebar) => {
  return (
    <div
      className={`overflow-hidden z-40 md:z-auto ${
        showMobileTopicsNav
          ? "fixed top-[60px] left-0 bottom-0 w-[70%] shadow-md"
          : "w-0"
      } bg-gray-50 text-primary md:bg-gray-100 md:text-primary md:min-h-[400px] md:max-h-[500px] md:block md:w-[34%] transition duration-700`}
    >
      <div className="h-full space-y-3 ">
        <h4 className="p-5 md:text-lg md:font-bold">Class Topics </h4>
        <ul className="h-full overflow-y-auto divide-y divide-gray-300 md:divide-primary-200 scrollbar scrollbar-thin hover:scrollbar-thumb-primary">
          {classData.topics && classData.topics?.length > 0 ? (
            classData.topics?.map((t, i) => (
              <li
                key={i}
                className={`${
                  i > 0 && "pt-3"
                } my-3 px-5 text-primary cursor-pointer line-clamp-2`}
              >
                <Link href={`/${classData.slug}/${t.slug}`}>
                  <a>{t.title}</a>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-5 italic text-red-600">No Topic</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
