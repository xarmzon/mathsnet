import Header from "../../components/general/Header";
import { NextSeo } from "next-seo";
const Classes = () => {
  return (
    <div>
      <NextSeo title="Classes" />
      <Header type="trans" />
      <div className="p-5">Classes</div>
    </div>
  );
};

export default Classes;
