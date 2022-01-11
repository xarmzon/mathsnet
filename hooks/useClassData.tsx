import React, { useState } from "react";
import { IClassData } from "../pages/[class_slug]";

export interface IUseClassData {
  classD: any;
}

export interface IUseClassDataReturn {
  classData: IClassData;
  setClassData: React.Dispatch<React.SetStateAction<IClassData>>;
}
const useClassData = ({ classD }: IUseClassData): IUseClassDataReturn => {
  const [classData, setClassData] = useState<IClassData>(() => {
    if (classD && classD.length > 0) {
      const data = JSON.parse(classD);

      return {
        id: data._id,
        price: data.price,
        title: data.title,
        desc: data.desc,
        slug: data.slug,
        thumbnail: data.thumbnail,
        subMonths: data.subMonths,
        createdAt: data.createdAt,
        topics:
          data.topics && data.topics?.length > 0
            ? data.topics?.map((t) => ({
                id: t._id,
                title: t.title,
                slug: t.slug,
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
    setClassData,
  };
};

export default useClassData;
