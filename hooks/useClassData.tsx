import React, { useState } from "react";
import { IClassData, ITopics } from "../utils/types";

export interface IUseClassData {
  classD: any;
  isTopic: boolean;
  topicSlug: string;
}

export interface IUseClassDataReturn {
  classData: IClassData;
  topicData?: ITopics;
}
const useClassData = ({
  classD,
  isTopic,
  topicSlug,
}: IUseClassData): IUseClassDataReturn => {
  const [classData, setClassData] = useState<IClassData>(() => {
    if (classD && classD.length > 0) {
      const data = JSON.parse(classD);

      return {
        id: data?._id,
        price: data?.price,
        title: data?.title,
        desc: data?.desc,
        slug: data?.slug,
        thumbnail: data?.thumbnail,
        subMonths: data?.subMonths,
        createdAt: data?.createdAt,
        topics:
          data?.topics && data?.topics?.length > 0
            ? data?.topics?.map((t: any) => ({
                id: t?._id,
                title: t?.title,
                slug: t?.slug,
                videoLink: t?.videoLink,
                description: t?.description,
                thumbnail: t?.thumbnail,
                createdAt: t?.createdAt,
              }))
            : [],
      };
    } else {
      return {
        id: "",
        price: 0,
        title: "",
        desc: "",
        slug: "",
        thumbnail: "",
        subMonths: 0,
        createdAt: "",
        topics: [],
      };
    }
  });

  return {
    classData,
    topicData: classData?.topics?.find((topic) => topic?.slug === topicSlug),
  };
};

export default useClassData;
