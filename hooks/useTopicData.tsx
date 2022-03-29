import { useEffect, useState } from "react";

interface IUseTopicData {
  classData: any;
  slug: string;
}

interface ITopicData {
  id: string;
  title: string;
  slug: string;
  videoLink: string;
  description: string;
  thumbnail: string;
  createdAt: string;
}

const useTopicData = ({ classData, slug }: IUseTopicData) => {
  const [topicData, setTopicData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    const topic = classData?.topics?.find((topic: any) => topic.slug === slug);
    if (topic) {
      setTopicData(topic);
      setHasData(true);
    } else {
      setHasData(false);
      setTopicData(null);
    }
  }, [classData, slug]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return {
    topicData,
    loading,
    hasData,
  };
};

export default useTopicData;
