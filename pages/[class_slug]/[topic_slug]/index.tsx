import { GetServerSideProps } from "next";
import { useRef, useState, useEffect } from "react";
import { ITopics } from "..";
import { connectDB } from "../../../utils/database";
import { getClassData } from "../../api/class";


const TopicViewPage = ({ topicData }) => {
  return (
    <div>
      Topic View Page
      {topicData}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();
  const { class_slug, topic_slug } = params;

  let classD: any;
  try {
    classD = await getClassData({ match: { slug: class_slug } });
  } catch (e) {
    console.log(e);
    classD = "";
  }

  return {
    props: {
      topicData: JSON.stringify(classD || "", null, 4),
    },
  };
};

export default TopicViewPage;
