import { GetServerSideProps } from "next";
import { useRef, useState, useEffect } from "react";

const TopicViewPage = () => {
  return <div>Topic View Page</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  return {
    props: {
      topicData: "",
    },
  };
};

export default TopicViewPage;
