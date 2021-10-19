import { GetServerSideProps } from "next";
import { useRef, useState, useEffect } from "react";

const ClassViewPage = () => {
  return <div>Class View Page</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  return {
    props: {
      classData: "",
    },
  };
};

export default ClassViewPage;
