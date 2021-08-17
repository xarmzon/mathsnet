import Header from "../../components/general/Header";
import { NextSeo } from "next-seo";
import Input from "../../components/controls/Input";
const Classes = () => {
  return (
    <div>
      <NextSeo title="Classes" />
      <Header />
      <div className="">
        <div className="bg-primary relative w-screen -mt-5 mb-12 min-h-[150px] text-gray-50">
          <div className="flex flex-col absolute mx-auto p-5 px-6 left-1/2 transform -translate-x-1/2 top-8 bg-gradient-to-br from-color5 to-color4 w-[90%] max-w-md">
            <h1 className="capitalize font-bold text-2xl text-center text-primary">
              Ready to make your mathematics learning a beautiful one?
            </h1>
            <p className="text-center  text-sm text-gray-700 my-4">
              Browse through our available classes to brighten your horizon and
              excel in Mathematics
            </p>
            <Input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="p-5">body</div>
      </div>
    </div>
  );
};

export default Classes;
