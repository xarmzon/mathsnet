import { GetServerSideProps } from "next";
import { useRef, useState, useEffect } from "react";
import { connectDB } from "../../utils/database";
import { getClassData } from "../api/class";
import { formatPrice } from "../../utils";

interface ITopics {
  id: string;
  title: string;
  slug: string;
}
interface IClassData {
  id: string;
  price: number;
  title: string;
  desc: string;
  slug: string;
  thumbnail: string;
  subMonths: number;
  createdAt: string;
  topics: ITopics[];
}

const ClassViewPage = ({ classD }) => {
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
        topics: data.topics.map((t) => ({
          id: t._id,
          title: t.title,
          slug: t.slug,
        })),
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
  classData && console.log(classData);
  return (
    <div>
      Class View Page
      <div></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();
  const { class_slug: slug } = params;

  const classD = await getClassData({ match: { slug } });
  //console.log(classD);
  return {
    props: {
      classD: JSON.stringify(classD, null, 4),
    },
  };
};

export default ClassViewPage;
